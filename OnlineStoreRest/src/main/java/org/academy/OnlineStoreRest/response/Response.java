package org.academy.OnlineStoreRest.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Response {

    private String message;

    private HttpStatus status;

    private LocalDateTime dateTime;
}
