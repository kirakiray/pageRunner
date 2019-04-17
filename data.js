define({
    type: "scroll",
    animation: [{
        type: "animeIn",
        name: "animate_top_fade_move_in",
        frame: {
            "opacity": 0,
            "transform": {
                "translateY": "-100%"
            }
        }
    }, {
        type: "animeOut",
        name: "animate_bottom_fade_move_out",
        frame: {
            "opacity": 0,
            "transform": {
                "translateY": "100%"
            }
        }
    }, {
        type: "animeIn",
        name: "animate_left_fade_move_in",
        frame: {
            "opacity": 0,
            "transform": {
                "translateX": "-100%"
            }
        }
    }, {
        type: "animeIn",
        name: "animate_right_fade_move_in",
        frame: {
            "opacity": 0,
            "transform": {
                "translateX": "100%"
            }
        }
    }],
    mainPage: {
        0: {
            tag: "page",
            // active: 1,
            "pageIn": "animate_top_fade_move_in",
            "pageOut": "animate_bottom_fade_move_out",
            "background-color": "#aaa",
            0: {
                tag: "text",
                intext: "我是文本1",
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "3%",
                "y": "30%",
                "w": "106%",
                "h": "50bw",
                "fontSize": "8bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "locksize": 1,
                "animateIn": "animate_left_fade_move_in",
                "animateOut": ""
            },
            1: {
                tag: "text",
                intext: "我是文本1-2",
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "17.938%",
                "y": "-4.444%",
                "w": "31.771%",
                "h": "50bw",
                "fontSize": "8bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "locksize": 1,
                "animateIn": "animate_right_fade_move_in",
                "animateOut": ""
            }
        },
        1: {
            tag: "page",
            "pageIn": "animate_top_fade_move_in",
            "pageOut": "animate_bottom_fade_move_out",
            "background-color": "#0aa",
            0: {
                tag: "text",
                intext: "我是文本2-1",
                "target": "safe",
                "hor": "end",
                "ver": "end",
                "x": "-10bw",
                "y": "-10bw",
                "w": "20%",
                "h": "100bw",
                "fontSize": "10bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "locksize": 1,
                "animateIn": "animate_left_fade_move_in",
                "animateOut": ""
            },
            1: {
                tag: "text",
                intext: "我是文本2-2",
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "0",
                "y": "0",
                "w": "147px",
                "h": "128px",
                "fontSize": "10bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "locksize": 1,
                "animateIn": "animate_top_fade_move_in",
                "animateOut": ""
            },
            2: {
                tag: "text",
                intext: "我是文本2-3",
                "target": "safe",
                "hor": "start",
                "ver": "start",
                "x": "10bw",
                "y": "10bw",
                "w": "25%",
                "h": "128px",
                "fontSize": "10bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "locksize": 1,
                "animateIn": "animate_right_fade_move_in",
                "animateOut": ""
            }
        },
        2: {
            tag: "page",
            "pageIn": "animate_top_fade_move_in",
            "pageOut": "animate_bottom_fade_move_out",
            "background-color": "#0a0",
            0: {
                tag: "text",
                intext: "我是文本3",
                "target": "safe",
                "hor": "start",
                "ver": "start",
                "x": "100px",
                "y": "-10bw",
                "w": "147px",
                "h": "128px",
            }
        }
    }
});