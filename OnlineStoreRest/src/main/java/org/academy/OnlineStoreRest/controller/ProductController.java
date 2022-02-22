package org.academy.OnlineStoreRest.controller;

import lombok.AllArgsConstructor;
import org.academy.OnlineStoreRest.dto.ProductDto;
import org.academy.OnlineStoreRest.response.Response;
import org.academy.OnlineStoreRest.service.ProductService;
import org.academy.OnlineStoreRest.valid.ProductCategoryValidatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
@AllArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final ProductCategoryValidatorService productCategoryValidatorService;

    @GetMapping
    public List<ProductDto> getProducts() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ProductDto getOne(@PathVariable("id") Integer id) {
        System.out.println(productService.findById(id));
        return productService.findById(id);
    }


    @GetMapping("/last")
    public List<ProductDto> getLastProduct() {
        return productService.findLast();
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity saveProduct(@Valid @RequestPart("product") ProductDto productDto,
                                      @RequestPart(name = "file", required = false) MultipartFile multipartFile) {
        System.out.println(productDto);
        System.out.println(multipartFile);
        Response response = productCategoryValidatorService.validateProductCategory(productDto.getProductCategoryName());
        if (response.getMessage() != null) {
            return ResponseEntity.ok(response);
        }


    String categoryName = productDto.getProductCategoryName();
    ProductDto productDto1 = productService.save(productDto, categoryName, multipartFile);
        System.out.println(productDto1);
        return ResponseEntity.ok(productDto1);
}
}
