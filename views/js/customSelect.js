$(document.body).on('change',"#attendance_class",function (e) {    alert( this.value );
    alert('hi');
    id = $(this).val();
    alert(id)
    var data = {"id":view_id};
    var url = $(this).data("url");
    // $.ajax({
    //     type: 'POST',
    //     data: JSON.stringify(data),
    //     contentType: "application/json",
    //     dataType:'json',
    //     url: url,                      
    //     success: function(result, status, xhr) {
    //             var output='<table id="datatable" class="table table-striped table-bordered bulk_action modal-table"><thead><tr><th>Details</th><th>Data</th></tr></thead><tbody>';
    //             for (var i in result)
    //             {
    //             output+='<tr><td>Driver Name</td><td>'+ result[i].driver_name+'</td></tr><td>Rider_Name</td><td>'+ result[i].rider_name+'</td></tr><td>Car Details</td><td>'+ result[i].car_type +'<br>'+'Model: '+result[i].car_details.model+'<br>'+ result[i].car_details.rc_number +'</td></tr><td>Source</td><td>'+ result[i].source_addr+ '</td></tr><td>Destinamtion</td><td>'+ result[i].destination_addr+'</td></tr><td>Trip Status</td><td>'+ result[i].trip_status+'</td></tr><td>Mode of Payment</td><td>'+ result[i].payment_method+'</td></tr><td>Trip Started Time</td><td>'+ result[i].time_started+'</td></tr><td>Trip Ended Time</td><td>'+ result[i].time_completed+'</td></tr><td>Total Distance</td><td>'+ result[i].total.distance+'</td></tr><td>Total Amount</td><td>'+ result[i].total.amount+'</td></tr><td>Feedback By Rider</td><td>'+result[i].feedback.rating_by_rider+' Star Rating<br>comments: '+ result[i].feedback.comment_by_rider+'</td></tr>';
    //             }
    //             output+="</tbody></table>";
    //         $('#view_detail').html(output);
    //         $('#dataModal').modal('show');
    //         },
    //     error: function(error) {
    //         alert("Something went wrong while fetching details. Please try after sometime.");
    //      }
    // });  
})