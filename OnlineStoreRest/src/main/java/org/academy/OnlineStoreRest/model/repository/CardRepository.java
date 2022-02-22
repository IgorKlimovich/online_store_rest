package org.academy.OnlineStoreRest.model.repository;

import org.academy.OnlineStoreRest.model.entity.Card;
import org.academy.OnlineStoreRest.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Integer> {
    void delete (Card card);
    List<Card> findAllByUser(User user);
}
