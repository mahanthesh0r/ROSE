(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){



var constit

window.onload=function(){
    constit = "bsk";
  console.log(constit);
  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET','https://election-red-server.herokuapp.com/elec/list/'+constit)
  ourRequest.onload = function(){
      var ourData = JSON.parse(ourRequest.responseText);
      console.log(ourData);
      var elec_id = ourData[0]._id;
      var elec_name = ourData[0].election_name;
      var electionDetails = {'elec_id': elec_id, 'election_name':elec_name};
      localStorage.setItem('electionDetails',JSON.stringify(electionDetails));
     candidates = ourData[0].candidates;
      renderHTML(candidates);
      
  };
  ourRequest.send();

var btn = document.getElementById("votebtn");
var slno = document.getElementById("slno");
var candidname = document.getElementById("candidname");
var partyname = document.getElementById("party_name");
var vote = document.getElementById("vote");

function renderHTML(data){
    var candid_name = "";
    var sl_no = "";
    var parties = "";
    var radiobtn = "";
    
    if(!localStorage.hasOwnProperty('VOTED'))
    {
    for(i=0; i<data.length;i++){
        sl_no += "<p>" + data[i]._id + "</p>";
        candid_name += "<p>" + data[i].name + "</p>";
        parties += "<p>" + data[i].party_name + "</p>";
        radiobtn += "<p>" + "<input type='radio' name='castvote' id="+ data[i]._id + ">" + "</p>"

    }
    
    slno.insertAdjacentHTML('beforeend',sl_no);
    candidname.insertAdjacentHTML('beforeend',candid_name);
    partyname.insertAdjacentHTML('beforeend',parties);
    vote.insertAdjacentHTML('beforeend',radiobtn);
    
    }
    else{
        btn.disabled = true;
    }
}
btn.addEventListener("click", function(){

    var votes = document.getElementsByName('castvote');
    var vote_id;
    for(var i =0;i<votes.length;i++){
        if(votes[i].checked){
            vote_id = votes[i].id;
            console.log(vote_id);
                var candid_id = vote_id;
                var storeCandid_id = {'candidate_id': candid_id };
                getCandidDetail(candid_id);

                //put data to local storage
                localStorage.setItem('candidate_id', JSON.stringify(storeCandid_id));
                return;
            }
        }  
       

       


})

function getCandidDetail(candid_id){
    
    for(var i=0;i<candidates.length;i++){
        if(candidates[i]._id == candid_id){
            var name = candidates[i].name;
            var party = candidates[i].party_name;
            var symbol = candidates[i].party_symbol;

            var candidDetailss = {'name':name, 'party_name':party,'symbol':symbol};
            localStorage.setItem('candidDetailss',JSON.stringify(candidDetailss));
            return;
        }
    }
}

}

},{}]},{},[1]);
