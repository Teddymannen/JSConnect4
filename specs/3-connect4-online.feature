Feature: Play Connect 4 Online

    Scenario: Two players play online
        Given we can see both screens
        And player "1" is on the game page
        And player "2" is on the game page
        And player "1" clicks on the "Online" button
        And player "2" clicks on the "Online" button
        When player "1" fill in "Player" with "OnlineAlice"
        And player "2" fill in "Player" with "OnlineBob"
        And player "1" fill in "Channel" with a random channel
        And player "2" fill in "Channel" with a random channel
        And player "1" clicks on the "Play" button
        Then player "1" should see the info text "Waiting for another player to join..."
        When player "2" clicks on the "Play" button
        Then player "1" should see the info text "Let's begin. OnlineAlice goes first."
        And player "2" should see the info text "Let's begin. OnlineAlice goes first."
        When player "1" click on column "1"
        Then player "1" should see the info text "It's OnlineBob's turn"
        And player "1" should see a "red" player piece on position "1,5"
        And player "2" should see the info text "It's OnlineBob's turn"
        And player "2" should see a "red" player piece on position "1,5"
        When player "2" click on column "2"
        Then player "2" should see the info text "It's OnlineAlice's turn"
        And player "2" should see a "yellow" player piece on position "2,5"
        And player "1" should see the info text "It's OnlineAlice's turn"
        And player "1" should see a "yellow" player piece on position "2,5"
        When player "1" click on column "1"
        Then player "1" should see the info text "It's OnlineBob's turn"
        And player "1" should see a "red" player piece on position "1,4"
        And player "2" should see the info text "It's OnlineBob's turn"
        And player "2" should see a "red" player piece on position "1,4"
        When player "2" click on column "2"
        Then player "2" should see the info text "It's OnlineAlice's turn"
        And player "2" should see a "yellow" player piece on position "2,4"
        And player "1" should see the info text "It's OnlineAlice's turn"
        And player "1" should see a "yellow" player piece on position "2,4"
        When player "1" click on column "1"
        Then player "1" should see the info text "It's OnlineBob's turn"
        And player "1" should see a "red" player piece on position "1,3"
        And player "2" should see the info text "It's OnlineBob's turn"
        And player "2" should see a "red" player piece on position "1,3"
        When player "2" click on column "2"
        Then player "2" should see the info text "It's OnlineAlice's turn"
        And player "2" should see a "yellow" player piece on position "2,3"
        And player "1" should see the info text "It's OnlineAlice's turn"
        And player "1" should see a "yellow" player piece on position "2,3"
        When player "1" click on column "1"
        Then player "1" should see the info text "OnlineAlice wins!"
        And player "1" should see a "red" player piece on position "1,2"
        And player "2" should see the info text "OnlineAlice wins!"
        And player "2" should see a "red" player piece on position "1,2"

