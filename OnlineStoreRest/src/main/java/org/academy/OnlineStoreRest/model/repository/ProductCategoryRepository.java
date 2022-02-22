package org.academy.OnlineStoreRest.model.repository;

import org.academy.OnlineStoreRest.model.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
    ProductCategory findByName(String productCategoryName);
    Boolean existsProductCategoryByName(String name);
    Optional<ProductCategory> findById(Integer id);
}


