/*
 * Muhibbudin Suretno
 *
 * @Project Name : Naga Bonar
 * @Project Start : 10 December 2016
 * @Email : muhibbudinsuretno1@gmail.com
 * @License : GPL-3.0
 * @Author : Muhibbudin Suretno
 *
 * Important!
 * Naga Bonar Class using jQuery for core library like animate, dom and anything
 *
 * Rule Of Game (Its the rule of the game, everything algoritmas of this game defining from this rule)
 * 1. Every pion move if start button or space key on clicked
 * 2. Every pion move to blok with formula current location + getting random number (ex. current location is 1
 *    and then this pion get dice 4 so this pion move to blok 5)
 * 3. If pion walk above stairs so this pion will move up to end of stairs [Up]
 * 4. If pion walk above dragon head so this pion will move down to end of tail dragon [Drop]
 * 5. If pion get dice and > last blok so move pion to last blok and then move to blok "Last blok - rest of move"
 *    (ex. My pion on blok 96 and i get dice 6 so my pion move to blok 100 and move again to blok 98 ) [Retreat]
 * 6. Player poin +10 if player moving, if player up so poin +20 and player drop so poin -5
 * 7. Player move is summary for all getting dice
 *
 * Formula Of Game (Define formula of game as math for moving and detection of pion and blok)
 *
 * 1. Use Math.floor(Math.random() * 10 * 4) to get random pixel position to set margin all of pion
 * 2. Use attribute data-blok to find specific blok
 * 3. Use (Blok offset left - (board offset left - 20 pixel) ) to set position left of pion
 * 4. Use (Blok offset top - (570 pixel + (Math.floor(Math.random() * 2) + 1) * 10) to set position top of pion
 * 5. If pion moving before last blok use (location of pion + moving) step else (location of pion - moving)
 * 6. If moving number as negative value convert it to positive with Math.abs() function
 * 7. Set last pion with "If last pion + 1 > maximum pion define it with 1 else define it with last pion + 1"
 * 8. Use 150 * moving step to set interval of moving pion
 * 9. If moving step > 5 convert moving step to 5
 *
 * Note : Sorry if my speak english not perfect :D
 */
var NagaBonar = (function() {
        
    var 
        /*
         * Load common jQuery Library
         *
         * If jquery or $ is undefined return as object
         */
        jq = (!isUndefined(window.$) || !isUndefined(window.jQuery)) ? window.$ || window.jQuery : {},
        
        /*
         * Default Configuration
         *
         * In this list i'm use variable to set all configuration with define :
         *
         * @allPion    = To set pion to use of game, maximum 4 pion [Dont Change]
         * @maxPion    = To get how many pion in game
         * @trigger    = Optional variable for trigger on some method
         * @lastPion   = To set last pion on last move
         * @lastBlok   = To get how many blok in game [Dont Change]
         * @board      = To define board element
         * @lang       = To define language for game (default id [Indonesia])
         * @env        = To set environtment for this game (dev or prod)
         * @blok       = Is default array to make blok grid [Dont Change]
         * @extraBlok  = Is customizible array to make extra blok in grid like dragon moving
         * @pionObject = Is default object for pion for save in localstorage
         */
        
        allPion    = [1,2,3,4],
        maxPion    = allPion.length,
        trigger    = false,        
        lastPion   = 0,
        lastBlok   = 100,
        board      = '',
        lang       = 'id',

        // Change this variable to 'prod' if you want to hide all Echo function
        env        = 'dev',
        
        // Don't change anything in this array!
        blok       = [
            [100,99,98,97,96,95,94,93,92,91],
            [81,82,83,84,85,86,87,88,89,90],
            [80,79,78,77,76,75,74,73,72,71],
            [61,62,63,64,65,66,67,68,69,70],
            [60,59,58,57,56,55,54,53,52,51],
            [41,42,43,44,45,46,47,48,49,50],
            [40,39,38,37,36,35,34,33,32,31],
            [21,22,23,24,25,26,27,28,29,30],
            [20,19,18,17,16,15,14,13,12,11],
            [1,2,3,4,5,6,7,8,9,10]
        ],

        // If you want to custom it please change a design of board too
        extraBlok  = {
            // Stairs blok config
            3:  [3,  54, 'move-up'],
            12: [12, 28, 'move-up'],
            31: [31, 74, 'move-up'],
            39: [39, 41, 'move-up'],
            58: [58, 95, 'move-up'],
            90: [90, 92, 'move-up'],
            
            // Dragon blok config
            21: [21, 5,  'drop-in'],
            30: [30, 8,  'drop-in'],
            56: [56, 23, 'drop-in'],
            72: [72, 15, 'drop-in'],
            94: [94, 50, 'drop-in'],
            98: [98, 44, 'drop-in'] 
        },

        pionObject = {
            time:0,
            pions:{
                1: {name: 'Ali', location: 1, step: 0, move: 0, summary: 0, poin: 0},
                2: {name: 'Nilam', location: 1, step: 0, move: 0, summary: 0, poin: 0},
                3: {name: 'William', location: 1, step: 0, move: 0, summary: 0, poin: 0},
                4: {name: 'Richard', location: 1, step: 0, move: 0, summary: 0, poin: 0}
            }
        };


    // Function to get info of value undefined or no
    function isUndefined(value) {
        return 'undefined' === typeof value;
    }

    // Function to get random number for dice 1 - 6
    function random() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Function to get window localStorage
    function storage(argument) {
        return window.localStorage;
    }

    // Function convert stringify to json
    function parse(string) {
        return JSON.parse(string);
    }

    // Function convert json to stringify
    function string(json) {
        return JSON.stringify(json);
    }

    // Define Color green : #038830, red : #F74316, blue : #0B3EDC
    function echo(msg, color) {
        var clr = '';
        switch(color) {
            case 'red' :
                clr = '#F74316';
                break;
            case 'green' :
                clr = '#038830';
                break;
            case 'blue' :
                clr = '#0B3EDC';
                break;
        };
        m = '%c '+msg;
        c = 'color:' + clr;
        if ('dev' === env)
            console.log(m, c);
    }

    // Function to get storage of this game
    function getStorage() {
        return (isUndefined(storage().naga_bonar)) ? 
                storage().naga_bonar = string(pionObject)
                : parse(storage().naga_bonar);
    }

    return {
        // Initialize all blok for grid
        initGrid: function(elm, callback) {
            getStorage();
            jq('.popup').hide();
            
            for (key in blok) {
                for (prop in blok[key]) {
                    var small = jq('<div/>');
                        small.addClass('nb-blok');
                        small.attr('data-blok', blok[key][prop]);
                        small.html(blok[key][prop]);

                    jq(elm).append(small);
                }
            }
            
            board = jq(elm);

            this.initStart();
            this.initWord();
            this.initPion();
            
            this.placeDice('dice-start');
            this.placeScore(1);

            echo('Info : Game has been loaded','blue');
            callback('Start the game');
        },

        // Set all pion to start blok
        initStart: function() {
            for (i in allPion) {
                var pion = jq('<div/>');
                    pion.addClass('nb-pion animated fadeInUp');
                    
                    pion.attr('data-pion', allPion[i]);
                    pion.attr('data-blok', 1);
                    pion.attr('data-move', 0);

                    pion.css('top', Math.floor(Math.random() * 10 * 4));
                    pion.css('left', Math.floor(Math.random() * 10 * 4));

                    pion.html(jq('<img/>').attr('src', 'img/pion-'+allPion[i]+'.png'));

                board.find('.nb-blok[data-blok="1"]').append(pion);
            }
        },

        initWord: function() {
            jq('.player-name').html(Language[lang].player_name);
            jq('.player-move').html(Language[lang].player_move);
            jq('.nb-start').html(Language[lang].button_start);
            jq('.nb-warning .nb-title').html(Language[lang].warning_title);
            jq('.nb-warning .nb-small').html(Language[lang].warning_small);
        },

        // Initialize place of pion when game on load
        initPion: function() {
            var storages = getStorage();
            for (i in storages.pions) {    
                var pin  = jq('.nb-pion[data-pion="'+i+'"]'),
                    blok = jq('.nb-blok[data-blok="'+storages.pions[i].location+'"]');

                pin.attr('data-pion', i);
                pin.attr('data-blok', storages.pions[i].location);
                pin.attr('data-move', storages.pions[i].move);
                
                pin.css('left', blok.offset().left - (board.offset().left - 20));
                pin.css('top', blok.offset().top - (570 + (Math.floor(Math.random() * 2) + 1) * 10));

                this.placeColor(i, storages.pions[i].location);
            }
        },

        // Initialize moving pion
        initMove: function(pion, move, moveBack = false, extraNumber = 0) {
            var vm       = this,
                pin      = jq('.nb-pion[data-pion="'+pion+'"]'),
                location = pin.attr('data-blok'),
                step     = (moveBack !== true) ? (parseInt(location) + parseInt(move)) : (parseInt(location) - parseInt(move));

            if (true === hasOwnProperty.call(extraBlok, step)) {
                vm.initAnimate(pion, step, move, extraNumber, function() {
                    var extraNumbers = 0;
                    if (extraBlok[step][2] === 'move-up') {
                        vm.messageUp(pion);
                        extraNumbers = 20;
                    } else {
                        vm.messageDrop(pion);
                        extraNumbers = -5;
                    }
                    vm.initMove(pion, (extraBlok[step][1] - step), false, extraNumbers);
                    extraNumbers = 0;
                });
            } else if (step > lastBlok) {
                vm.initAnimate(pion, lastBlok, (move - (step - lastBlok)), extraNumber, function() {
                    setTimeout(function() {
                        vm.initMove(pion, (step - lastBlok), true, 0);
                    }, 300);
                });
            } else if (step === 100) {
                vm.initAnimate(pion, step, move, extraNumber);
                vm.closeGame(pion);
            } else {
                vm.initAnimate(pion, step, move, extraNumber);
            }
        },

        // Initialize animation of moving pion
        initAnimate: function(pion, blok, move, extra, callback) {
            var vm    = this,
                pin   = jq('.nb-pion[data-pion="'+pion+'"]'),
                block = jq('.nb-blok[data-blok="'+blok+'"]'),
                move  = (move < 0) ? Math.abs(move) : move,
                time  = (move <= 5) ? (150 * move) : (150 * 5)

            pin.animate({
                left: block.offset().left - (board.offset().left - 20),
                top : block.offset().top - (570 + (Math.floor(Math.random() * 2) + 1) * 10)
            }, time, function() {

                echo('Debug : Current pion = '+lastPion+', Position = '+blok+', Move = '+move+' ', 'green');
                
                vm.saveAction(pion, blok, move, extra);
                vm.placeColor(pion, blok);

                pin.attr('data-blok', blok);
                pin.attr('data-move', move);

                jq('.nb-start').removeClass('disabled');

                vm.placeScore(pion);

                if (!isUndefined(callback)) {
                    callback('This step complete');
                }

            });
        },

        // Start this game
        doStart: function(el) {
            var vm     = this,
                number = random(),                
                pion   = (lastPion + 1 > maxPion) ? 1 : lastPion + 1;

            if (!jq(el).hasClass('disabled')) {
                vm.placeDice('dice-random');
                
                setTimeout(function() {
                    vm.placeDice(number);
                    vm.initMove(pion, number);
                }, 1500);

                lastPion = pion;
            };

            jq('.nb-start').addClass('disabled');
        },

        // Restart this game
        doRestart: function() {
            var vm = this;
            
            this.popupMessageShow(Language[lang].restart_title, Language[lang].restart_button_approve, Language[lang].restart_button_cancel, function() {
                window.localStorage.naga_bonar = string(pionObject);
                
                jq('.nb-blok').removeClass('active');
                jq('.nb-player .player-poin').html(0);
                jq('.nb-player .player-avatar').html(jq('<img/>').attr('src', 'img/avatar-default.png'));

                vm.initWord();
                vm.initPion();

                echo('Info : Game has been re-started', 'blue');
            }, function() {
                // Do something when error
            });
        },
        
        // Active and deactive blok color when pion is moving
        placeColor: function(pion, blok) {
            var pin      = jq('.nb-pion[data-pion="'+pion+'"]'),
                findBlok = pin.attr('data-blok');

            jq('.nb-blok[data-blok="'+findBlok+'"]').removeClass('active');
            jq('.nb-blok[data-blok="'+blok+'"]').addClass('active');
        },

        // Place random dice to container
        placeDice: function(name) {
            jq('.nb-dice').html(
                jq('<img/>').attr('src', 'img/'+name+'.png')
            );
        },

        // Place score and move of this pion
        placeScore: function(pion) {
            var storages = getStorage(),
                bracket  = storages.pions[pion];
                
            jq('.nb-player .player-name').html(bracket.name);
            jq('.nb-player .player-avatar').html(jq('<img/>').attr('src', 'img/avatar-'+pion+'.png'));
            jq('.nb-player .player-poin').html(bracket.poin);
            jq('.nb-player .player-move').html(Language[lang].player_move + ' ' + bracket.step+'x');
        },

        // Function to save all move / action
        saveAction: function(pion, step, move, extra) {
            var poins    = 10 + extra,
                storages = getStorage(),
                bracket  = storages.pions[pion],
                data     = {
                    name     : bracket.name,
                    location : step,
                    step     : bracket.step + 1,
                    move     : move,
                    summary  : bracket.summary + move,
                    poin     : bracket.poin + poins
                };

            storages.pions[pion] = data;
            return window.localStorage.naga_bonar = string(storages);
        },

        // Show message and move pion to top blok
        messageUp: function(pion) {
            echo('Message : Awesome pion '+pion+' you are move up', 'blue');
        },

        // Show message and move pion to under blok
        messageDrop: function(pion) {
            echo('Message : Be careful pion '+pion+' you are move down', 'red');
        },

        // Close a game if this method is called
        closeGame: function(pion) {
            var vm       = this,
                storages = getStorage(),
                bracket  = storages.pions[pion];
            
            jq('.nb-finish-box .nb-content').css('visibility','visible').addClass('zoomIn');
            
            jq('.nb-finish-box .nb-content .name').html('<b>'+ bracket.name +'</b>!');
            jq('.nb-finish-box .nb-content .score').html('<b>'+ bracket.poin +'</b>');
            jq('.nb-finish-box .nb-content .move').html('<b>'+ bracket.step +'</b>');

            jq('.nb-finish-box .nb-content .congrat').html(Language[lang].finish_congrat);
            jq('.nb-finish-box .nb-content .first').html(Language[lang].finish_first);
            jq('.nb-finish-box .nb-content .center').html(Language[lang].finish_center);
            jq('.nb-finish-box .nb-content .last').html(Language[lang].finish_last);
            
            jq('.nb-finish-box .nb-content .share').html(Language[lang].finish_share);

            jq('.nb-finish-box .nb-content .fn-restart').html(Language[lang].finish_fn_restart);
            jq('.nb-finish-box .nb-content .fn-share').html(Language[lang].finish_fn_share);
            jq('.nb-finish-box .nb-content .fn-github').html(Language[lang].finish_fn_github);

            jq('.nb-finish-box .fn-restart').click(function() {
                window.localStorage.naga_bonar = string(pionObject);
                
                jq('.nb-blok').removeClass('active');
                jq('.nb-player .player-poin').html(0);
                jq('.nb-player .player-avatar').html(jq('<img/>').attr('src', 'img/avatar-default.png'));
                
                vm.initWord();
                vm.initPion();

                vm.popupMessageClose();
                
                echo('Info : Game has been re-started', 'blue');
            });

            setTimeout(function() {
                jq('.nb-finish-box').removeClass('zoomIn');
            }, 1000);

            echo('Good job pion '+pion+' you are a winner ..', 'green');
        },

        popupMessageShow: function(title, approveText, denyText, approveCallback, denyCallback) {
            var vm = this;
            
            jq('.nb-flexbox, .nb-message-box').css('visibility','visible').addClass('zoomIn');
            jq('.nb-message-box .title').html(title);
            jq('.nb-message-box .message-approve').html(approveText).click(function() {
                approveCallback('clicked');
                vm.popupMessageClose();
            });
            jq('.nb-message-box .message-deny').html(denyText).click(function() {
                denyCallback('clicked');
                vm.popupMessageClose();
            });

            setTimeout(function() {
                jq('.nb-flexbox, .nb-message-box').removeClass('zoomIn');
            }, 1000);
        },

        popupMessageClose: function(title, approveText, denyText, approveCallback, denyCallback) {
            jq('.nb-flexbox, .nb-message-box, .nb-finish-box .nb-content').addClass('zoomOut');
            setTimeout(function() {
                jq('.nb-flexbox, .nb-message-box, .nb-finish-box .nb-content').removeClass('zoomOut').css('visibility','hidden');
            }, 500);
        }
    }
})()