package org.academy.OnlineStoreRest.model.repository;

import org.academy.OnlineStoreRest.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
}
