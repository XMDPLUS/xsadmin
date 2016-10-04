(function() {
    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('search-results');

        if (results.size > 0) { // Are there any results?
            var appendString = '<li class="time-label"><span class="bg-green">' + messages.has_results.replace('{TERM}', searchTerm).replace('{CNT}', results.size) + '</span></li>';

            results.forEach(function(item) {
                appendString += '<li>';
                appendString += '<i class="fa fa-envelope bg-blue"></i>';
                appendString += '<div class="timeline-item">';
                appendString += '<h3 class="timeline-header"><a href="' + (window.activeLang != "" ? "/" + window.activeLang : "") + item.url + '">' + item.title + '</a></h3>';
                appendString += '<div class="timeline-body">' + item.content.substring(0, 280) + '...<div>';
                appendString += '<div class="timeline-footer">&nbsp;';
                appendString += '<a class="btn btn-primary btn-xs pull-right" href="' + (window.activeLang != "" ? "/" + window.activeLang : "") + item.url + '">Read more</a>';
                appendString += '</div>';
                appendString += '</div>';
                appendString += '</li>';
            });
            appendString += '<li>';
            appendString += '<i class="fa fa-clock-o bg-gray"></i>';
            appendString += '</li>';
            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li class="time-label"><span class="bg-red">' + messages.no_result.replace('{TERM}', searchTerm) + '</span></li>';
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    function searchXMD(searchTerm) {
        var results = new Set();

        for(var key in window.store) {
            for(var item in window.store[key]) {
                if(window.store[key][item].replace(/ /gi, '').indexOf(searchTerm) !== -1) {
                    results.add(window.store[key]);
                }
            }
        }

        return results;
    }

    var searchTerm = getQueryVariable('query');

    if (searchTerm) {
        document.getElementById('search-box').setAttribute("value", searchTerm);
        console.log(searchTerm);
        var results = searchXMD(searchTerm); // Get lunr to perform a search
        displaySearchResults(results, window.store); // We'll write this in the next section
    }
})();
