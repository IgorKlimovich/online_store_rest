package org.academy.OnlineStoreRest.service.impl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.academy.OnlineStoreRest.dto.UserDto;
import org.academy.OnlineStoreRest.form.UserForm;
import org.academy.OnlineStoreRest.mail.EmailService;
import org.academy.OnlineStoreRest.model.entity.*;
import org.academy.OnlineStoreRest.model.repository.UserRepository;
import org.academy.OnlineStoreRest.service.UserService;
import org.academy.OnlineStoreRest.service.UtilService;
import org.modelmapper.ModelMapper;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final UserRepository userRepository;

    private final ModelMapper modelMapper;

    private final EmailService emailService;

    private final UtilService utilService;
//
//    public UserServiceImpl(BCryptPasswordEncoder bCryptPasswordEncoder,
//                           UserRepository userRepository, ModelMapper modelMapper,
//                           EmailService emailService) {
//        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//        this.userRepository = userRepository;
//        this.modelMapper = modelMapper;
//        this.emailService = emailService;
//    }

    @Override
    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login);
        if (user == null) {
            try {
                throw new NullPointerException();
            } catch (NullPointerException e) {
                log.error("in find user by login: user not found by login {}", login);
            }
        }
        log.info("in find user by login: founded user {} by login {}", user, login);
        return modelMapper.map(user, UserDto.class);
    }


    @Override
    public UserDto create(UserForm userForm) {

        Role role = new Role();
        State state = new State();
        List<Order> orderList = new ArrayList<>();
        state.setId(1);
        role.setId(1);
        role.setName("USER");
        state.setName("ACTIVE");
        userForm.setRole(role);
        userForm.setState(state);
        userForm.setOrders(orderList);
        userForm.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));
        User user = modelMapper.map(userForm, User.class);
        User registeredUser = userRepository.save(user);
        UserDto userDto = modelMapper.map(registeredUser, UserDto.class);
//        emailService.sendWelcomeMessage(user.getEmail(),user.getFirstName());
        log.info("in save user: user{} saved", user);
        return userDto;
    }

    @Override
    public void update(UserForm userForm, UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        user.setFirstName(userForm.getFirstName());
        user.setLastName(userForm.getLastName());
        user.setPhoneNumber(userForm.getPhoneNumber());
        user.setEmail(userForm.getEmail());
        user.setLogin(userForm.getLogin());
        user.setPassword(userForm.getPassword());
        userRepository.save(user);
        log.info("in update user: user {} updated", user);
    }

    @Override
    public void update(UserDto userDto) {
        User user = modelMapper.map(userDto, User.class);
        userRepository.save(user);
        log.info("in update user: user {} updated", userDto);
    }

    @Override
    public User findByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            try {
                throw new NullPointerException();
            } catch (NullPointerException e) {
                log.error("in find user  by email: user not found by email {}", email);
            }
        }
        log.info("in find user by email: founded user {} by email {}", user, email);
        return user;
    }

    @Override
    public UserDto findByPhoneNumber(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber);
        if (user == null) {
            try {
                throw new NullPointerException();
            } catch (NullPointerException e) {
                log.error("in find user by phone number: user not found by phone number {}", phoneNumber);
                return null;
            }
        }
        log.info("in find user by phone number: user {} founded by phone number {}", user, phoneNumber);
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public List<UserDto> findAll() {
        List<User> users = userRepository.findAll();
        List<UserDto> usersDto = new ArrayList<>();
        for (User user : users) {
            UserDto map = modelMapper.map(user, UserDto.class);
            usersDto.add(map);
        }
        log.info("in find all users: founded {}", users.size());
        return usersDto;
    }

    @Override
    public UserDto findById(Integer id) {
        Optional<User> candidate = userRepository.findById(id);
        User user = null;
        try {
            user = candidate.orElseThrow(Exception::new);
        } catch (Exception e) {
            log.error("in find user by id: user not found by id {}", id);
            return null;
        }
        log.info("in find user by id: user {} founded by id {}", user, id);
        return modelMapper.map(user, UserDto.class);

    }

    @Override
    public void toBan(Integer id) {
        UserDto userDto = findById(id);
        User user = modelMapper.map(userDto, User.class);
        State state = new State();
        state.setId(2);
        state.setName("BANNED");
        user.setState(state);
        userRepository.save(user);
        log.info("in ban user: user {} banned", user);
    }

    @Override
    public void unBan(Integer id) {
        UserDto userDto = findById(id);
        User user = modelMapper.map(userDto, User.class);
        State state = new State();
        state.setId(1);
        state.setName("ACTIVE");
        user.setState(state);
        userRepository.save(user);
        log.info("in unban user: user {} unbanned", user);
    }

    public User findUserById(Integer id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException());
        log.info("in find user by id: user {} founded by id {}", user, id);
        return user;
    }

    @Override
    public UserDto setDelete(String login) {
        UserDto userDto = findByLogin(login);
        User user = modelMapper.map(userDto, User.class);
        State state = new State();
        state.setId(3);
        state.setName("DELETED");
        user.setState(state);
        User userAfterSave=userRepository.save(user);
        log.info("in set delete user: user {} set delete", user);
        return modelMapper.map(userAfterSave,UserDto.class);
    }

    @Override
    public UserDto setActive(String login) {
        UserDto userDto = findByLogin(login);
        User user = modelMapper.map(userDto, User.class);
        State state = new State();
        state.setId(1);
        state.setName("ACTIVE");
        user.setState(state);
        User userAfterSave=userRepository.save(user);
        log.info("in set active user: user {} set active", user);
        return modelMapper.map(userAfterSave,UserDto.class);
    }

    @Override
    public Boolean existsUserByEmail(String email) {
        return userRepository.existsUserByEmail(email);
    }

    @Override
    public Boolean existsUserByLogin(String login) {
        return userRepository.existsUserByLogin(login);
    }

    @Override
    public Boolean existsUserByPhoneNumber(String phoneNumber) {
        return userRepository.existsUserByPhoneNumber(phoneNumber);
    }

    @Override
    public UserDto savePhoto(MultipartFile file, UserDto userDto) {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String uploadDir = "C:/Users/админ/Downloads/OnlineStoreRest/OnlineStoreRest/src/main/" +
                "frontend/public/images/user-photos-rest/" + userDto.getId().toString();
        utilService.savePhotoWithPath(uploadDir, fileName, file);
        userDto.setNamePhoto(fileName);
        User user = modelMapper.map(userDto, User.class);
        log.info("in save photo name: photo name{} saved for user {}", fileName, user);
        return modelMapper.map(userRepository.save(user), UserDto.class);
    }

    public UserDto deletePhoto(Integer id) {
        User user = findUserById(id);
        user.setNamePhoto(null);
        return modelMapper.map(userRepository.save(user), UserDto.class);
    }
}

