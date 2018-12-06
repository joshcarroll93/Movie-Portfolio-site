var movieRequest = new XMLHttpRequest();
var movieSearchRequest = new XMLHttpRequest();
var movieList = [];
var movieSearchList = [];
var pageNumber = 1;
var key = '07edc0b067ac61fe00f8259504795708';
var myParam;

async function getMovies(param) {
    myParam = param;
    var url = 'https://api.themoviedb.org/3/movie/' + param
        + '?api_key=' + key + '&language=en-US&page='
        + pageNumber.toString();

    console.log(url);
    movieRequest.open('GET', url, true);

    movieRequest.onload = function () {

        var data = JSON.parse(this.response);

        for (var i = 0; i < data.results.length; i++) {

            var movie = {
                poster: 'https://image.tmdb.org/t/p/w342/' + data.results[i].poster_path,
                title: data.results[i].title,
                voteAverage: data.results[i].vote_average,
                overview: data.results[i].overview
            };

            movieList.push(movie);

        }
        displayMovies(movieList);
    };
    movieRequest.send();
    movieRequest.DONE;
}

function $ajax() {
    ++pageNumber;
    console.log('page number: ' + pageNumber);
    getMovies(myParam);
}

function displayMovies(list) {
    clearDivs();
    var container = document.getElementById('imageContainer');
    container.style.marginTop = "1%";
    console.log('list length: ' + list.length);
    for (var i = 0; i < list.length; i++) {

        //container for related poster and info divs
        var div = document.createElement('div');
        div.style.border = "1px solid #000000";
        div.style.display = "inline-block";
        div.style.width = "60%";
        div.style.height = "100%";
        div.style.marginBottom = "5px";

        //movie poster
        var img = document.createElement('img');
        img.style.width = "50%";
        img.style.height = "100%";
        img.style.verticalAlign = "left";
        img.style.float = "left";
        img.src = list[i].poster;
        img.alt = list[i].title;

        //movie info
        var info = document.createElement('info');
        info.style.display = "block";
        info.style.width = "50%";
        info.style.height = "100%";
        info.style.float = "right";
        info.style.paddingTop = "10px";
        info.innerText = list[i].title + '\n\n'
            + 'Rating: ' + list[i].voteAverage + '\n\n'
            + list[i].overview;

        div.appendChild(img);
        div.appendChild(info);
        container.appendChild(div);
    }
}

window.onscroll = function () {
    // var fileName = location.href.split("/").slice(-1);
    // alert(fileName);
    // console.log("Page: "+fileName);

    var docElement = document.documentElement;
    var offset = docElement.scrollTop + window.innerHeight;
    var height = docElement.offsetHeight;
    console.log('1 scrollTop: ' + docElement.scrollTop);
    console.log('2 innerHeight: ' + window.innerHeight);
    console.log('3 offsetHeight: ' + height);
    if (offset + 10 >= height) {
        console.log('At the bottom');

        console.log('offset: ' + offset + ', height: ' + height);
        $ajax({});
    }
};

function searchMovies() {

    var input = document.getElementById('searchBox');
    var searchData = input.value;
    var url = 'https://api.themoviedb.org/3/search/movie?api_key='+ key +
        '&language=en-US&query=' + encodeURI(searchData) + '&page=1&include_adult=false';

    if(searchData != null){
        console.log(url);

        movieSearchRequest.open('GET', url, true);

        movieSearchRequest.onload = function () {
            var data = JSON.parse(this.response);
            console.log(data.results);
            if(data.results.length > 0){
                for (var i = 0; i < data.results.length; i++) {

                    movieSearchList[i] = {
                        poster: 'https://image.tmdb.org/t/p/w342/' + data.results[i].poster_path,
                        title: data.results[i].title,
                        voteAverage: data.results[i].vote_average,
                        overview: data.results[i].overview
                    };
                }
            }else{
                alert("Please enter a VALID movie title!");
            }

            console.log(movieSearchList.length);
            displayMovies(movieSearchList);
        };
        movieSearchRequest.send();
    }else{
        alert("Please Enter A Movie Title!");
    }
}

function clearDivs() {

    var div = document.getElementById('imageContainer');
    if(div != null){
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
    }
}

function carousel() {
    var i;
    // var x = document.getElementsByClassName("mySlides");
    var x = document.getElementById()
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    setTimeout(carousel, 2000); // Change image every 2 seconds
}

function getImages() {

}
