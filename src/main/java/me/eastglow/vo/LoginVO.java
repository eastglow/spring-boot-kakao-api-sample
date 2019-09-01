package me.eastglow.vo;

import lombok.*;
import org.apache.ibatis.type.Alias;

@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@ToString
@Alias("loginVO")
public class LoginVO {
    int pkid;
    @NonNull
    String userId;
    @NonNull
    String userPw;
    @NonNull
    String userNm;
    boolean isValidUser = false;
}
