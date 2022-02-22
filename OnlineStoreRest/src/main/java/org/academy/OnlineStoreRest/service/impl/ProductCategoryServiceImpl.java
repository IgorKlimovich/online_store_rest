package org.academy.OnlineStoreRest.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.academy.OnlineStoreRest.dto.ProductCategoryDto;
import org.academy.OnlineStoreRest.dto.ProductDto;
import org.academy.OnlineStoreRest.model.entity.Product;
import org.academy.OnlineStoreRest.model.entity.ProductCategory;
import org.academy.OnlineStoreRest.model.repository.ProductCategoryRepository;
import org.academy.OnlineStoreRest.service.ProductCategoryService;
import org.academy.OnlineStoreRest.util.UtilListMapper;
import org.modelmapper.ModelMapper;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductCategoryServiceImpl implements ProductCategoryService {

    private final ProductCategoryRepository productCategoryRepository;
    private final ModelMapper modelMapper;
    private final UtilListMapper utilListMapper;

    @Override
    public List<ProductCategoryDto> findAll() {
        List<ProductCategory> productCategories = productCategoryRepository.findAll();
        log.info("in find all product categories: founded {} product categories", productCategories.size());
        List<ProductCategoryDto> productCategoriesDto= new ArrayList<>();
        for (ProductCategory productCategory : productCategories) {
            ProductCategoryDto map = modelMapper.map(productCategory, ProductCategoryDto.class);
            productCategoriesDto.add(map);
        }
        return productCategoriesDto;
    }

    @Override
    public ProductCategoryDto findByName(String name) {
        ProductCategory productCategory = productCategoryRepository.findByName(name);
        if (productCategory==null){
            log.error("in find product category by name: product category not found by name {}",name);
            return null;
        }
        log.info("in find product category by name: product category {} founded by name {}", productCategory, name);
        return modelMapper.map(productCategory,ProductCategoryDto.class);
    }

    @Override
    public Boolean existsProductCategoryByName(String name) {
        return productCategoryRepository.existsProductCategoryByName(name);
    }

    @Override
    public ProductCategoryDto save(String name) {
        ProductCategory productCategory = new ProductCategory();
        productCategory.setName(name);
        productCategory.setAmount(0);
        ProductCategory category = productCategoryRepository.save(productCategory);
        log.info("in save product category: product category {} saved", productCategory);
        return modelMapper.map(category,ProductCategoryDto.class);
    }


    @Override
    public List<ProductCategoryDto> findAllByIds(List<Integer> id) {
        List<ProductCategory> productCategories = productCategoryRepository.findAll();
        List<ProductCategory> res = new ArrayList<>();
        for (ProductCategory productCategory : productCategories) {
            if (id.contains(productCategory.getId())) {
                res.add(productCategory);
            }
        }
        List<ProductCategoryDto> productCategoriesDto= new ArrayList<>();
        for (ProductCategory productCategory:res){
            ProductCategoryDto map = modelMapper.map(productCategory, ProductCategoryDto.class);
            productCategoriesDto.add(map);
        }
        log.info("in find product categories by ids: founded {} product categories ", res.size());
        return productCategoriesDto;
    }

    @Override
    public ProductCategoryDto findById(Integer id) {
        ProductCategory productCategory = null;
        try {
            productCategory = productCategoryRepository.findById(id).orElseThrow(Exception::new);
        } catch (Exception e) {
            log.error("in find by id product category : product category not found by id {}", id);
            return null;
        }
        log.info("in find by id product category : product category {} founded by id {}", productCategory, id);
        return modelMapper.map(productCategory, ProductCategoryDto.class);

    }

    @Override
    public void update(ProductCategoryDto productCategoryDto) {
        ProductCategoryDto forUpdateProductCategoryDto = findById(productCategoryDto.getId());
        forUpdateProductCategoryDto.setName(productCategoryDto.getName());
        ProductCategory productCategoryForUpdate=modelMapper.map(forUpdateProductCategoryDto,ProductCategory.class);
        productCategoryRepository.save(productCategoryForUpdate);
        log.info("in update product category: product category {} updated", productCategoryForUpdate);
    }

    @Override
    public void delete(ProductCategoryDto productCategoryDto) {
        ProductCategory productCategory =modelMapper.map(productCategoryDto,ProductCategory.class);
        productCategoryRepository.delete(productCategory);
        log.info("in delete product category: product category {} deleted", productCategory);
    }

    public List<ProductDto>findProductsByCategory(Integer id){
       ProductCategory productCategory= productCategoryRepository.findById(id).orElseThrow(NullPointerException::new);
        List<Product> products = productCategory.getProducts();
        return utilListMapper.mapList(products,ProductDto.class);
    }
}
