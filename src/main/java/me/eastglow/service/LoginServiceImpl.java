package me.eastglow.service;

import lombok.extern.slf4j.Slf4j;
import me.eastglow.dao.LoginMapper;
import me.eastglow.vo.LoginVO;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Slf4j
@Service
public class LoginServiceImpl implements LoginService {

    @Resource
    private LoginMapper loginMapper;

    @Resource
    private BCryptPasswordEncoder bCryptPasswordEncoder;

@Override
public void setInitUserData() throws Exception {
    for(int i=1; i<=3; i++){
        LoginVO tempVO = new LoginVO("test"+i, bCryptPasswordEncoder.encode("test"+i), "테스터"+i);
        loginMapper.insertInitUserData(tempVO);
    }
}

    @Override
    public LoginVO getValidUserView(LoginVO loginVO) throws Exception {
        boolean isValidUser = false;
        LoginVO viewVO = loginMapper.selectUserView(loginVO);

        if(bCryptPasswordEncoder.matches(loginVO.getUserPw(),viewVO.getUserPw())){
            isValidUser = true;
        }

        viewVO.setValidUser(isValidUser);

        return viewVO;
    }
}
