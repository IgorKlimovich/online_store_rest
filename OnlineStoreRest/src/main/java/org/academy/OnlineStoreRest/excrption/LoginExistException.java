package org.academy.OnlineStoreRest.excrption;

public class LoginExistException extends RuntimeException{
    public LoginExistException() {
    }

    public LoginExistException(String message) {
        super(message);
    }
}
