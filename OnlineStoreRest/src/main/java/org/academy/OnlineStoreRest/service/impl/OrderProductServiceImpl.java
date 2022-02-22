package org.academy.OnlineStoreRest.service.impl;

import lombok.extern.slf4j.Slf4j;

import org.academy.OnlineStoreRest.dto.OrderDto;
import org.academy.OnlineStoreRest.dto.OrderProductDto;
import org.academy.OnlineStoreRest.dto.ProductDto;
import org.academy.OnlineStoreRest.model.entity.Order;
import org.academy.OnlineStoreRest.model.entity.OrderProduct;
import org.academy.OnlineStoreRest.model.entity.Product;
import org.academy.OnlineStoreRest.model.entity.ProductCategory;
import org.academy.OnlineStoreRest.model.repository.OrderProductRepository;
import org.academy.OnlineStoreRest.model.repository.OrderRepository;
import org.academy.OnlineStoreRest.model.repository.ProductCategoryRepository;
import org.academy.OnlineStoreRest.model.repository.ProductRepository;
import org.academy.OnlineStoreRest.service.OrderProductService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class OrderProductServiceImpl implements OrderProductService {

    private final OrderProductRepository orderProductRepository;
    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;

    public OrderProductServiceImpl(OrderProductRepository orderProductRepository,
                                   ProductRepository productRepository,
                                   ProductCategoryRepository productCategoryRepository,
                                   OrderRepository orderRepository, ModelMapper modelMapper) {
        this.orderProductRepository = orderProductRepository;
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void save(OrderProduct orderProduct) {
        orderProductRepository.save(orderProduct);
        log.info("in save order product: order product {} saved", orderProduct);
    }

//    @Override
//    @Transactional
//    public void removeProductFromOrder(OrderDto orderDto, ProductDto productDto) {
//
//        Product product = modelMapper.map(productDto, Product.class);
//        Order order = modelMapper.map(orderDto, Order.class);
//        try {
//            List<OrderProduct> orderProducts = order.getOrderProducts();
//            OrderProduct orderProduct = orderProducts
//                    .stream()
//                    .filter(item -> item.getProduct().getId().equals(product.getId()))
//                    .findFirst().orElseThrow(Exception::new);
//            product.setAmount(product.getAmount() + 1);
//            product.setIsExist(product.getAmount() > 0);
//            ProductCategory productCategory = productCategoryRepository.getById(product.getProductCategory().getId());
//            productCategory.setAmount(productCategory.getAmount() + 1);
//            order.setFullPrice(order.getFullPrice() - orderProduct.getNewProductPrice());
//            productRepository.save(product);
//            productCategoryRepository.save(productCategory);
//            orderRepository.save(order);
//            orderProductRepository.delete(orderProduct);
//            log.info("in remove product from order: product {} removed from order {}", product, order);
//        } catch (Exception e) {
//            log.warn("in remove product from order: product category not found by id {}",
//                    product.getProductCategory().getId());
//        }
//    }

    @Override
    @Transactional
    public void removeProductFromOrder(Integer id) {
        OrderProduct  orderProduct = orderProductRepository.getById(id);
        Product product = orderProduct.getProduct();
//        Product product = modelMapper.map(productDto, Product.class);
        Order order = orderProduct.getOrder();
//        Order order = modelMapper.map(orderDto, Order.class);
        try {
//            List<OrderProduct> orderProducts = order.getOrderProducts();
//            OrderProduct orderProduct = orderProducts
//                    .stream()
//                    .filter(item -> item.getProduct().getId().equals(product.getId()))
//                    .findFirst().orElseThrow(Exception::new);
            product.setAmount(product.getAmount() + 1);
            product.setIsExist(product.getAmount() > 0);
            ProductCategory productCategory = productCategoryRepository.getById(product.getProductCategory().getId());
            productCategory.setAmount(productCategory.getAmount() + 1);
            order.setFullPrice(order.getFullPrice() - orderProduct.getNewProductPrice());
            productRepository.save(product);
            productCategoryRepository.save(productCategory);
            orderRepository.save(order);
            orderProductRepository.delete(orderProduct);
            log.info("in remove product from order: product {} removed from order {}", product, order);
        } catch (Exception e) {
            log.warn("in remove product from order: product category not found by id {}",
                    product.getProductCategory().getId());
        }
    }

    @Override
    @Transactional
    public void saveProductToOrder(OrderDto orderDto, ProductDto productDto) {
        Product product = modelMapper.map(productDto, Product.class);
        Order order = modelMapper.map(orderDto, Order.class);
        order.setFullPrice(order.getFullPrice() + product.getPrice());
        orderRepository.save(order);
        product.setAmount(product.getAmount() - 1);
        product.setIsExist(product.getAmount() > 0);
        ProductCategory productCategory = productCategoryRepository.findByName(productDto.getProductCategoryName());
        System.out.println(productCategory);
        product.setProductCategory(productCategory);
        productCategory.setAmount(productCategory.getAmount() - 1);
        productCategoryRepository.save(productCategory);
        productRepository.save(product);
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrder(order);
        orderProduct.setProduct(product);
        orderProduct.setNewProductPrice(product.getPrice());
        orderProductRepository.save(orderProduct);
        log.info("in save product to order: product {} saved to order {}", product, order);
    }

    @Override
    public List<OrderProductDto> findByOrderId(Integer id) {
        List<OrderProduct> orderProducts = orderProductRepository.findAllByOrderId(id);
        if (orderProducts.isEmpty()){
            log.warn("in find OrderProducts by id: orderProducts not found by id {}",id);
            return Collections.emptyList();
        }
        List<OrderProductDto> orderProductsDto = new ArrayList<>();
        for (OrderProduct orderProduct : orderProducts) {
            OrderProductDto map = modelMapper.map(orderProduct, OrderProductDto.class);
            orderProductsDto.add(map);
        }
            log.info("in find OrderProducts by id: founded {} by id{}", orderProducts.size(), id);
            return orderProductsDto;
        }
    }
