

window.onload = function(){

     candname = document.getElementById('candidname')
     party = document.getElementById('party')
     party_symbol = document.getElementById('img_symbol')
     symbol = ""

     var payload = localStorage.getItem('candidDetailss');
       payload2 = localStorage.getItem('electionDetails')
       payload3 = localStorage.getItem('candidate_id');

       elecID = JSON.parse(payload2);
       //electionID
       electionID = elecID.elec_id;

       cand_id = JSON.parse(payload3);
       //Candidate ID
       candidateID = cand_id.candidate_id;

     candidDetails = JSON.parse(payload)
     candname.value = candidDetails.name;
     party.value = candidDetails.party_name;
     symbol = candidDetails.symbol;

     img = document.createElement('img');

     img.src = symbol;
     party_symbol.appendChild(img);


     

     var votebtn = document.getElementById("confm_btn");
     var backbtn = document.getElementById('decline_btn');

     url = "https://election-red-server.herokuapp.com/elec/list/"+electionID+"/"+candidateID

     votebtn.addEventListener('click',function(){
        $.ajax({
            url:url,
            type:"GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(result){
                alert("VOTED");
                votebtn.disabled = true;
                backbtn.disabled = true;

                voted = {'voted':true}
                localStorage.setItem('VOTED',JSON.stringify(voted))

                console.log(result, "VOTED");
            },
            error:function(error){
                alert("ERROR");
                console.log(`Error ${error}`)
            }
        })
     })
}