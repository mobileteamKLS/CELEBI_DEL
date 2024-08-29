/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        var canvas = document.getElementById('signature-pad');

        // Adjust canvas coordinate space taking into account pixel ratio,
        // to make it look crisp on mobile devices.
        // This also causes canvas to be cleared.
        function resizeCanvas() {
            // When zoomed out to less than 100%, for some very strange reason,
            // some browsers report devicePixelRatio as less than 1
            // and only part of the canvas is cleared then.
            var ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
        }

        window.onresize = resizeCanvas;
        resizeCanvas();

        var signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255, 255, 255)' // necessary for saving image as JPEG; can be removed is only saving as PNG or SVG
        });

        document.getElementById('save-png').addEventListener('click', function () {
            if (signaturePad.isEmpty()) {
                return alert("Please provide a signature first.");
            }

            var data = signaturePad.toDataURL('image/png');
            console.log(data);
            window.open(data);
        });

        document.getElementById('save-jpeg').addEventListener('click', function () {
            if (signaturePad.isEmpty()) {
                return alert("Please provide a signature first.");
            }

            var data = signaturePad.toDataURL('image/jpeg');
            console.log(data);
            window.open(data);
        });

        document.getElementById('save-svg').addEventListener('click', function () {
            if (signaturePad.isEmpty()) {
                return alert("Please provide a signature first.");
            }

            var data = signaturePad.toDataURL('image/svg+xml');
            console.log(data);
            console.log(atob(data.split(',')[1]));
            window.open(data);
        });

        document.getElementById('clear').addEventListener('click', function () {
            signaturePad.clear();
        });

        document.getElementById('draw').addEventListener('click', function () {
            var ctx = canvas.getContext('2d');
            console.log(ctx.globalCompositeOperation);
            ctx.globalCompositeOperation = 'source-over'; // default value
        });

        document.getElementById('erase').addEventListener('click', function () {
            var ctx = canvas.getContext('2d');
            ctx.globalCompositeOperation = 'destination-out';
        });

    }
};

app.initialize();