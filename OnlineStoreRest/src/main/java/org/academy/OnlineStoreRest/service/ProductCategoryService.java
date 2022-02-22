package org.academy.OnlineStoreRest.service;

import org.academy.OnlineStoreRest.dto.ProductCategoryDto;
import org.academy.OnlineStoreRest.dto.ProductDto;

import java.util.List;

public interface ProductCategoryService {
    List<ProductCategoryDto> findAll();

    ProductCategoryDto findByName(String name);

    Boolean existsProductCategoryByName(String name);

    ProductCategoryDto save(String name);

    List<ProductCategoryDto> findAllByIds(List<Integer> id);

    ProductCategoryDto findById(Integer id);

    void update(ProductCategoryDto productCategoryDto);

    void delete(ProductCategoryDto productCategoryDto);

    List<ProductDto>findProductsByCategory(Integer id);
}
