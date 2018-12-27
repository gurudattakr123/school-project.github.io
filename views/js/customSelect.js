$().ready(function() {


  var class_select = $("#attendance_class")
  var section_select = $("#attendance_section");
  var subject_select = $("#attendance_subject");
  $(class_select).change( function () {    
    id = $(this).val();
    data = {'id' : id}
        $.ajax({
            type: 'POST',
            data: data,
            dataType:'json',
            url: '/students/select',
      success: function(data){
          var opts = $.parseJSON(data);
          options1 = '<option disabled selected value="">Select a Section</option>';
          options2 = '<option disabled selected value="">Select a Subject</option>'
         
          $.each(opts.sections, function(key, value) {
            options1 += '<option value="' + value + '">' + value + '</option>';
          }); 
          $.each(opts.subjects, function(key, value) {
            options2 += '<option value="' + value + '">' + value + '</option>';
          });
            section_select.html(options1);
            subject_select.html(options2);
            $('.selectpicker').selectpicker('refresh');
            $('.selectpicker').selectpicker('render');
      }
  });
});

var sectionwise_students = $('#sectionwise_students');
$(sectionwise_students).change( function () {    
  id = $(this).val();
  data = {'section_name' : id}
  url  = window.location.pathname;
      $.ajax({
          type: 'POST',
          data: data,
          dataType:'json',
          url: url,
    success: function(students){
     
      $('#myTable').DataTable().destroy();
      $('#myTable tbody th').empty();
      $('#myTable').DataTable( {
        data: students,
        columns: [
            { data: 'roll_number' },
            { data: 'first_name' },
            { data: 'gender' },
            { data: 'age' },
            { data: 'section_name' },
            { data: 'admission_no' },
            { data: " " }
        ]
    } );
        }
      })
 })


 //done
 var student_class = $('#student_class');
 var student_section = $('#student_section');
 $(student_class).change(function(){
   id = $(this).val();
   data = {'id' : id}
       $.ajax({
           type: 'POST',
           data: data,
           dataType:'json',
           url: '/students/select',
     success: function(data){
         var opts = $.parseJSON(data);
         options = '<option disabled selected value="">Select a Section</option>';
        
         $.each(opts.sections, function(key, value) {
           options += '<option value="' + value + '">' + value + '</option>';
         }); 
         
          student_section.html(options);
          $('.selectpicker').selectpicker('refresh');
          $('.selectpicker').selectpicker('render');
     }
 });
 })
})
