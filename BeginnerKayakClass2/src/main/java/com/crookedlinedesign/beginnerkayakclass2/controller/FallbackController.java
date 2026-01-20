package com.crookedlinedesign.beginnerkayakclass2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class FallbackController {

    @RequestMapping(value = "/introduction")
    public String redirect1() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/classroom")
    public String redirect2() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/pool1")
    public String redirect3() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/river1")
    public String redirect4() {
        return "redirect:https://paddlewhitewater.net/";
    }
    @RequestMapping(value = "/pool2")
    public String redirect5() {
        return "redirect:https://paddlewhitewater.net/";
    }
    @RequestMapping(value = "/river2")
    public String redirect6() {
        return "redirect:https://paddlewhitewater.net/";
    }
    @RequestMapping(value = "/pool3")
    public String redirect7() {
        return "redirect:https://paddlewhitewater.net/";
    }
    @RequestMapping(value = "/river3")
    public String redirect8() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/river4")
    public String redirect9() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/locations")
    public String redirect10() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/gearChecklist")
    public String redirect11() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/clubRiverTrips")
    public String redirect12() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/americanWhitewater")
    public String redirect13() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/riverGauges")
    public String redirect14() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/instructionMaterials")
    public String redirect15() {
        return "redirect:https://paddlewhitewater.net/";
    }

    @RequestMapping(value = "/shoppingResources")
    public String redirect16() {
        return "redirect:https://paddlewhitewater.net/";
    }

}
