package org.academy.OnlineStoreRest.service;


import org.academy.OnlineStoreRest.dto.TokenDto;
import org.academy.OnlineStoreRest.form.LoginForm;

public interface LoginService {

    TokenDto login(LoginForm loginForm);
}
