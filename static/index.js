//we’ll be using the jQuery selector for displaying the date in place of the heading of the HTML page.
// “$” denotes that we are using a jQuery selector. 
//It is followed by the action to be performed on the HTML element. 
//Inside selector, we give: 1. The element to be selected. 
//For e.g., p stands for paragraph. e.g. $(p) 2. 
//Class selector by giving class name followed by ‘.’ .e.g. $(“.demo”) 3.
//Id selector by writing id of the HTML element followed by #. e.g. $(“#demo”)


var date = new Date()
let display_date = "Date:" + date.toLocaleDateString()

//Load HTML DOM
$(document).ready(function () {
    $("#display_date").html(display_date)
})

let predicted_emotion;
//HTML-->JavaScript--->Flask
//Flask--->JavaScript--->HTML
//In this function, we’ll create the AJAX function. 
//This method requires parameters in the form of key-value pairs. 
//Some common key-value pairs that need to be passed are: 
//i. url: URL of the page where we want to send the request. 
//ii. type: type of the request, GET or POST. 
//iii. data: actual data that needs to be sent to the server. 
//iv. dataType: datatype of the response. 
//v. contentType: type of content used while sending a request to the server.
//vi. success: a function after the request is successful. 
//vii. error: a function after the request fails.
$(function () {
    $("#predict_button").click(function () {

        let input_data = {
            "text": $("#text").val()
        }
        console.log(input_data)

        $.ajax({
            type: 'POST',
            url: "/predict-emotion",
            data: JSON.stringify(input_data),
            dataType: "json",
            contentType: 'application/json',
            success: function (result) {

                // Result Received From Flask ----->JavaScript
                predicted_emotion = result.data.predicted_emotion
                emo_url = result.data.predicted_emotion_img_url


                // Display Result Using JavaScript----->HTML
                $("#prediction").html(predicted_emotion)
                $('#prediction').css("display", "block");

                $("#emo_img_url").attr('src', emo_url);
                $('#emo_img_url').css("display", "block");
            },
            error: function (result) {
                alert(result.responseJSON.message)
            }
        });
    });
})

// Let’s write the code for Flask to receive the request and process it.
//  The steps are:
//   1. Create an API to receive the request in POST format. 
//   2. When the request is received, the function predict_emotion() is called.
//   3. This function will receive the data in JASON format from the ‘text’ object created in AJAX. 
//   4. Now, there are two possibilities.a.The user clicks the Predict Emotion button without entering text.
//   In this case, the error must be generated and sent back to AJAX.b.The user enters text for prediction.
//    5. When no text is entered the response is sent with two parameters:
//    a. status: ‘error’ This shows that the request is not successful. b. Message: 
//If an error occurs, then the message is to be sent to the HTML page. These errors are displayed on command prompt.


// const weekDay = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
// const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


// display_date = `${weekDay[date.getDay() - 1]}, ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`