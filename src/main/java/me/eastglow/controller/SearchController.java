package me.eastglow.controller;

import lombok.extern.slf4j.Slf4j;
import me.eastglow.common.KakaoRestApiHelper;
import me.eastglow.service.SearchService;
import me.eastglow.vo.LoginVO;
import me.eastglow.vo.SearchVO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class SearchController {

    @Resource
    private KakaoRestApiHelper kakaoRestApiHelper;

    @Resource
    private SearchService searchService;

    @GetMapping(value="/place")
    public ResponseEntity searchPlaceByKeyword(HttpSession session, SearchVO paramVO) throws Exception {
        ResponseEntity re = kakaoRestApiHelper.getSearchPlaceByKeyword(paramVO);
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");

        paramVO.setUserPkid(loginVO.getPkid());

        if("search".equals(paramVO.getSearchType())){
            // 내 검색 히스토리 등록
            searchService.createHistory(paramVO);

            // 인기 키워드 등록
            searchService.mergeKeyword(paramVO);
        }

        return re;
    }

    @PostMapping(value="/place")
    public ResponseEntity<Map<String, List<SearchVO>>> updateKeywordAndHistory(HttpSession session) throws Exception {
        Map<String, List<SearchVO>> dataMap = new HashMap<>();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        List<SearchVO> historyList = searchService.getHistoryList(loginVO.getPkid());
        List<SearchVO> topKeywordList = searchService.getTopKeywordList();

        dataMap.put("historyList", historyList);
        dataMap.put("topKeywordList", topKeywordList);

        if(loginVO == null || !loginVO.isValidUser()){
            return new ResponseEntity<>(dataMap, HttpStatus.FORBIDDEN);
        }else{
            return new ResponseEntity<>(dataMap, HttpStatus.OK);
        }
    }
}
