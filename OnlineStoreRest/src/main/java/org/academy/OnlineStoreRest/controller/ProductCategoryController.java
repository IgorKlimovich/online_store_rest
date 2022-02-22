package org.academy.OnlineStoreRest.controller;

import org.academy.OnlineStoreRest.dto.ProductCategoryDto;
import org.academy.OnlineStoreRest.dto.ProductDto;
import org.academy.OnlineStoreRest.service.ProductCategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productCategories")
@CrossOrigin("*")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;


    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    public List<ProductCategoryDto> findAll(){
        return productCategoryService.findAll();
    }

    @PostMapping
    public ResponseEntity<ProductCategoryDto> save(@RequestBody ProductCategoryDto productCategoryDto){
        ProductCategoryDto categoryDto = productCategoryService.save(productCategoryDto.getName());
        return ResponseEntity.ok(categoryDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCategoryDto> findOne (@PathVariable("id")Integer id){
        ProductCategoryDto productCategoryDto = productCategoryService.findById(id);
        System.out.println(productCategoryDto);
        return ResponseEntity.ok(productCategoryDto);
    }
    @GetMapping("/products/{id}")
    public ResponseEntity <List<ProductDto>> findProductsByCategory (@PathVariable("id")Integer id){
      List<ProductDto> productsDto = productCategoryService.findProductsByCategory(id);
        return ResponseEntity.ok(productsDto);
    }
}


