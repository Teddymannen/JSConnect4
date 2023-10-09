Feature: Connect 4 with bots

    Background: game page
        Given I am on the game page
        And I have clicked on the "Offline" button

    Scenario: Two easy bots play against each other
        When I click on the radio button "easyBot" bots with name "radio1"
        And I click on the radio button "easyBot" bots with name "radio2"
        And I fill in "Easy Bot 1" with "Anna"
        And I fill in "Easy Bot 2" with "Bob"
        And I click the "Play" button
        Then I should see the info text "Let's begin. Easy Bot Anna goes first."
        Then there should exist "1" cells with class "red"
        And I should see the info text "Easy Bot Bob's turn."
        Then there should exist "1" cells with class "yellow"
        And I should see the info text "Easy Bot Anna's turn."
        Then there should exist "2" cells with class "red"
        And I should see the info text "Easy Bot Bob's turn."
        Then there should exist "2" cells with class "yellow"
        And I should see the info text "Easy Bot Anna's turn."
        Then there should exist "3" cells with class "red"
        And I should see the info text "Easy Bot Bob's turn."
        Then there should exist "3" cells with class "yellow"
        And I should see the info text "Easy Bot Anna's turn."
        Then there should exist "4" cells with class "red"

