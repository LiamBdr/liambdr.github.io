$( document ).ready(function() {

    //RANDOM BPM ÉNIGME
    function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    bpm = document.querySelector('#bpm span');
    currentBpm = parseInt(bpm.innerHTML);

    setInterval(() => {

        randomIntervall = getRandomArbitrary(2, 20);

        newBpm = getRandomArbitrary((currentBpm - randomIntervall), (currentBpm + randomIntervall));


        if (newBpm <= 55) {
            newBpm = currentBpm + 3;
        }

        bpm.innerHTML = newBpm;
        
    }, 2000);


    //GESTION CARTE ÉNIGME
    $(".map").draggable({
        containment : "main",
        scroll:false
    });

    $("a#map").click(function() {

        if ($(this).hasClass("activ")) {

            $(this).removeClass("activ");
            $(".map").removeClass("activ");


            
        } else {

            $(this).addClass("activ");
            $(".map").addClass("activ");

        }
        
    });

    $(".map-close").click(function() {
        $("a#map").removeClass("activ");
        $(".map").removeClass("activ");
    });


    //SETTINGS 


    $("a#settings").click(function(e) {

        e.preventDefault();

        if ($(this).hasClass("activ")) {

            $(this).removeClass("activ");
            $(".settings").removeClass("activ");

            
        } else {

            $(this).addClass("activ");
            $(".settings").addClass("activ");
        }
        
    });


    $("#sound").click(function(e) {

        e.preventDefault();

        if ($(this).hasClass("on")) {

            $(this).removeClass("on");
            $(this).addClass("off");
            document.getElementById("enigme-audio").pause();

        } else {

            $(this).removeClass("off");
            $(this).addClass("on");
            document.getElementById("enigme-audio").play();
        }
        
    });

    $("#language").click(function(e) {

        e.preventDefault();

        if ($(this).hasClass("fr")) {

            $(this).removeClass("fr");
            $(this).addClass("en");
        } else {
            $(this).addClass("fr");
            $(this).removeClass("en");
        }
        
    });

    //INPUT NUMBER
    $('.input-num').on('focus', function() {
        $(this).val('');
    });

    $('.input-num').on('input keyup change paste', function(i) {
        $(this).val($(this).val().replace(/[^0-9]/gi, ''));

        $(this).val($(this).val().substring(0,1));
    });

    let total = document.getElementsByClassName('input-num');
    $('.input-num').on('keyup', function(i) {

        if (i.keyCode >= 48 && i.keyCode <= 57) {
            
            let currentId = i.target.id;
            let id = parseInt(currentId.match(/\d+/)[0]);
            let nextId = 'num'+(id+1);

            if (id <+ total.length) {
                document.getElementById(nextId).focus();
            }
            
        }

    });


    //ENIGME VIDEO
    if (document.getElementById('enigme-video')) {
        document.getElementById('enigme-video').play();
    }
    
    let enigme = '';
    let numEnigme = document.querySelector('#num-enigme').value;

    let pageTitre = document.querySelector('#dialogue b');
    let pageTexte = document.querySelector('#dialogue p');

    //GESTION ENIGME
    result = fetch('/js/enigmes.json')
        .then(function (envoie) {
            return envoie.json();
        })
        .then(function (affichage) {

            enigme = affichage[numEnigme];

            pageTitre.innerHTML = enigme.titre;
            pageTexte.innerHTML = enigme.texte1;

            document.querySelector('.next-arrow').addEventListener("click", function (e) {
                e.preventDefault();

                if (enigme.texte2 && pageTexte.innerHTML == enigme.texte1) {

                    pageTexte.innerHTML = enigme.texte2;

                } else if (pageTexte.innerHTML == enigme.texte2) {

                    document.getElementById('dialogue').remove();


                    $('main').append("<div id='enigme-cache'></div> <img id='hero-robot' src='assets/enigme/robot.png' alt='Robot'>");

                    $('main').append(` <div class='reponse'>

                    <div class='enonce'>
                      <svg class='logo' width='33' height='37' viewBox='0 0 33 37'>
                        <path d='M3.9717 9.50622C4.25789 10.0451 4.51228 10.5999 4.79847 11.1546C4.86305 11.2314 4.95349 11.2821 5.05286 11.2972C5.38675 11.2972 5.72064 11.2497 6.05453 11.2497C6.38842 11.2497 6.29302 11.1546 6.34072 10.9961C6.44324 10.4712 6.57595 9.95256 6.73821 9.44283C7.10389 9.93416 7.27879 10.4572 7.56498 10.9961C7.58326 11.0602 7.62348 11.1159 7.67866 11.1536C7.73384 11.1912 7.8005 11.2084 7.86707 11.2021H9.04363C9.08984 11.1923 9.1329 11.1713 9.16897 11.1409C9.20503 11.1105 9.23298 11.0716 9.25032 11.0278C9.34572 10.7583 9.37752 10.4414 9.50471 10.1719H9.58421C9.69597 10.3343 9.78678 10.51 9.8545 10.6949C9.9976 11.1546 10.2838 11.2972 10.7608 11.3289C11.6511 11.3765 12.5574 11.5191 13.3842 11.9471C13.6863 12.1056 13.8453 11.9788 13.7976 11.6301C13.416 9.64887 10.8721 8.84054 9.28212 8.04806L8.16916 9.12583L8.08966 9.09413C8.08132 8.66417 8.11326 8.23436 8.18506 7.81031C8.20096 7.60426 8.16916 7.49332 7.96246 7.41407C7.77232 7.35246 7.5907 7.26726 7.42188 7.16047C7.23109 7.03368 7.11979 7.09708 6.9767 7.25557C6.661 7.59666 6.32092 7.91448 5.95913 8.20655C5.89554 7.66766 6.02273 7.22387 6.03863 6.70083C6.03431 6.65478 6.02084 6.61004 5.999 6.56922C5.97716 6.5284 5.9474 6.49233 5.91144 6.46309C5.37085 6.16195 5.37085 6.16195 4.95747 6.60574C4.54408 7.04953 4.30559 7.31897 3.8763 7.66766C3.81271 7.00198 3.924 6.41554 3.9558 5.7657C3.96528 5.73238 3.96781 5.69747 3.96323 5.66314C3.95866 5.6288 3.94707 5.59576 3.92919 5.56606C3.91132 5.53636 3.88753 5.51063 3.85929 5.49044C3.83105 5.47026 3.79896 5.45606 3.76501 5.44871C3.20853 5.17927 2.20686 4.89397 2.81104 4.11734C7.77167 -1.74704 16.3574 -1.2874 20.0461 5.11587C25.3406 15.0536 14.1156 24.4208 4.98927 18.5881C3.19263 17.5262 1.76168 16.1155 0.839508 14.2136C0.632815 13.7539 0.473821 13.2626 0.314827 12.7871C0.279084 12.7097 0.262249 12.625 0.2657 12.5399C0.269152 12.4548 0.292791 12.3717 0.334682 12.2975C0.376572 12.2232 0.435521 12.16 0.506691 12.1128C0.577861 12.0657 0.659225 12.036 0.744112 12.0263C1.50729 11.852 2.27046 11.6776 3.04953 11.535C3.14967 11.5353 3.24623 11.4979 3.31993 11.4303C3.39362 11.3628 3.43901 11.2699 3.44702 11.1704C3.55071 10.6063 3.69416 10.0502 3.8763 9.50622H3.9717ZM16.4369 4.73548C16.4369 4.46603 15.2921 4.35508 14.2905 4.51358C13.2888 4.67208 12.0168 5.44871 12.3984 5.65476C12.7538 5.85845 13.1468 5.9887 13.5538 6.03771C13.9608 6.08673 14.3736 6.05351 14.7674 5.94005C15.7532 5.67061 16.4369 4.98907 16.4369 4.73548Z'/>
                        <path d='M24.0667 22.8704C27.56 20.6263 30.7268 21.938 32.7346 25.32C31.7062 25.9995 30.6615 26.6317 29.5678 27.2322C28.1235 28.0134 26.4634 28.3389 24.8189 28.1632C23.1745 27.9876 21.6276 27.3196 20.3939 26.2524C18.7452 28.133 17.5209 30.1717 17.3576 32.7477C19.4144 32.0049 20.7693 32.5896 22.5976 33.522C23.1526 33.8065 23.5607 34.249 23.9361 34.7389C24.2427 35.1281 24.5812 35.4927 24.9482 35.8293C25.2094 36.0664 25.3073 36.2876 25.2094 36.5721C25.1114 36.8566 24.8829 36.9988 24.5075 36.9988H6.27379C5.63716 37.0304 5.32701 36.4299 5.7351 35.9558L7.18792 33.9329C7.30219 33.7749 8.31426 32.6844 8.90192 32.5106C9.57969 32.3389 10.2999 32.4296 10.9097 32.7635C11.633 33.1577 12.4339 33.4 13.2604 33.4746C13.5052 33.4904 13.6195 33.443 13.6848 33.1744C14.1808 31.0886 15.0185 29.0932 16.166 27.2638C16.3129 27.0426 18.6309 24.1821 19.039 23.7871C19.4471 23.392 19.9368 23.0601 20.3286 22.6334C21.4059 21.3849 20.6387 20.168 19.6919 19.046L21.6508 16.6122C22.555 17.0908 23.3757 17.7041 24.083 18.4297C24.1483 18.5087 24.8992 19.6307 24.9482 19.8836C25.2747 21.0214 24.7523 21.9538 24.0667 22.8704Z'/>
                      </svg>
              
                      <b>Énigme</b>
                      <p>
                      </p>
                    </div>
              
                    <form action='`+enigme.action+`'>
                      <div>
                        <input class='input-num' id='num1' type='number' name='premier' min='0' max='9' value='0'>
                        <input class='input-num' id='num2' type='number' name='deux' min='0' max='9' value='0'>
                        <input class='input-num' id='num3' type='number' name='trois' min='0' max='9' value='0'>
                        <input class='input-num' id='num4' type='number' name='quatre' min='0' max='9' value='0'>
                      </div>
              
                      <input type='submit' value='Valider'>
                    </form>
              
                  </div>`)

                  document.querySelector('.enonce p').innerHTML = enigme.enigme;

                }

            });

        });
    

});