var fs = require('fs');

var device_id
window.onload=function(){ 
  var device_id = fs.readFileSync('device_id.txt',{"flag": 'rs',"encoding":'utf8'});
  console.log(device_id);


  $(document).ready(function(){
		const url='https://user-red-server.herokuapp.com/user/alloc';
		$('#allocbtn').click(function(e){
			e.preventDefault();
      var adhaar = document.getElementById("adhaartxt").value;
      
			console.log(adhaar);
			$.ajax({
				url:url,
				type:"POST",
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify({
					"adhaar": adhaar,
					"device_id": device_id
				}),
				dataType: "json",
				success:function(result){
          document.getElementById('adhaartxt').value=''
          console.log(result)				
        },
				error:function(error){
          document.getElementById('adhaartxt').value=''
					console.log(`Error ${error}`)
				}
			})
		})
  })
}