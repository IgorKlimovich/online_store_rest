package org.academy.OnlineStoreRest.service;

import org.academy.OnlineStoreRest.dto.CardDto;
import org.academy.OnlineStoreRest.dto.UserDto;

import java.util.List;

public interface CardService {
    CardDto save(CardDto cardDto, UserDto userDto);
    CardDto findById(Integer cardId);
    void remove(Integer CardId);
    CardDto update(CardDto cardDto);
    List<CardDto> findAllByUser(UserDto userDto);
}
