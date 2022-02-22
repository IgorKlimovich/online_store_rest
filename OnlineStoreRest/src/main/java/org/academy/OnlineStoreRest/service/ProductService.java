package org.academy.OnlineStoreRest.service;

import org.academy.OnlineStoreRest.dto.ProductDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {
    List<ProductDto> findAll();

    ProductDto findById(Integer id);

    Boolean existsProductByName(String name);

    List<ProductDto> findAllByName(String name);

    List<ProductDto> findAllByIds(List<Integer> id);

    ProductDto save(ProductDto productDto, String categoryName, MultipartFile file);

    void update(ProductDto product);

    void delete(ProductDto productDto);

    List<ProductDto> findLast();

    ProductDto findByPhotoName(String photoName);

    void addPhoto(ProductDto productDto);

    void deletePhoto(ProductDto productDto);

}
