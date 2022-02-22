package org.academy.OnlineStoreRest.valid;

import lombok.AllArgsConstructor;
import org.academy.OnlineStoreRest.dto.CardDto;
import org.academy.OnlineStoreRest.dto.OrderDto;
import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.response.Response;
import org.academy.OnlineStoreRest.service.CardService;
import org.academy.OnlineStoreRest.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class CardValidatorService {

    private  final CardService cardService;

    public Response validateCard(CardDto cardDto, UserDto userDto) {
        String message = null;
        if (userDto.getCardsDto().stream().anyMatch(item->item.getNumber().equals(cardDto.getNumber()))){
            message="card is already exist";
        }
        Response response = new Response(message, HttpStatus.OK, LocalDateTime.now());
        return response;
    }

    public Response validateExistCard(String cardNumber, UserDto userDto) {
        OrderDto orderDto = userDto.getOrdersDto().stream().filter(order-> order.getStateOrderDto().getName()
                .equals("NEW")).findAny().orElseThrow(()->new NullPointerException("no order"));
        String message= null;
        if (userDto.getCardsDto().stream().noneMatch(card->card.getNumber().equals(cardNumber))){
            message="you nave not this card";
        }
        if (userDto.getCardsDto().stream().filter(item -> item.getNumber().equals(cardNumber))
                .findFirst()
                .orElse(new CardDto()).getTotalAmount() < orderDto.getFullPrice()) {
            message="no money";
        }
        System.out.println(message);
        return new Response(message,HttpStatus.OK, LocalDateTime.now());
    }

    public Response validateExistUpdateCard(UserDto userDto, CardDto cardDto){
        String message = null;
        List<CardDto> cardsDto = userDto.getCardsDto();
        CardDto cardDtoFromDb = cardService.findById(cardDto.getId());
        cardsDto.remove(cardDtoFromDb);
        if (cardsDto.stream().anyMatch(card->card.getNumber().equals(cardDto.getNumber()))) {
            message="you already have this card";
        }
        return new Response(message,HttpStatus.OK,LocalDateTime.now());
    }
}
