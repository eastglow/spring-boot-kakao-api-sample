package me.eastglow.vo;

import lombok.*;
import org.apache.ibatis.type.Alias;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Alias("searchVO")
public class SearchVO {

    String id;
    int currentPage = 1;
    int pageSize = 10;

    int userPkid;
    Date regDate;
    String convertRegDate;

    String keyword;
    String keywordNm;
    int keywordCnt;

    String searchType;

}
