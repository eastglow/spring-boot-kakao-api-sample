package me.eastglow.configuration;

import me.eastglow.service.LoginService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class InitDataLoader implements CommandLineRunner {

    @Resource
    private LoginService loginService;

    @Override
    public void run(String... args) throws Exception {
        loginService.setInitUserData();
    }
}
