    $(document).ready(function() {
        var games = $('#games .game').get();

        games.sort(function(a, b) {
            var titleA = $(a).find('.game-title').text().toUpperCase();
            var titleB = $(b).find('.game-title').text().toUpperCase();

            var isTitleANumber = /^\d+$/.test(titleA);
            var isTitleBNumber = /^\d+$/.test(titleB);

            if ((isTitleANumber && isTitleBNumber) || (!isTitleANumber && !isTitleBNumber)) {
                return titleA.localeCompare(titleB);
            } else {
                return isTitleBNumber - isTitleANumber;
            }
        });

        $('#games').empty();

        $.each(games, function(index, game) {
            $('#games').append(game);
        });
    });
