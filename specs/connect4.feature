
Feature: Play Connect 4

    Background: game page
        Given I am on the game page
        And I have clicked on the "Offline" button

    Scenario: Starting a new game
        Then I should see "Connect Four"

    Scenario: Starting the game with player names
        When I fill in "Player 1" with "Alice"
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        Then I should see the info text "Let's begin. Alice goes first."

    # Scenario: Starting the game without entering a name
    #     When I click the "Play" button without entering a name
    #     Then I should see an error message

    Scenario: Alice (player 1) plays a piece
        When I fill in "Player 1" with "Alice"
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        Then I should see the info text "Let's begin. Alice goes first."
        When I click on column "0"
        Then I should see a "red" piece in the bottom of column "0"
        And I should see the info text "It's Bob's turn."

    Scenario: Bob (player 2) plays a piece
        When I fill in "Player 1" with "Alice"
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        Then I should see the info text "Let's begin. Alice goes first."
        When I click on column "0"
        Then I should see a "red" piece in the bottom of column "0"
        And I should see the info text "It's Bob's turn."
        When I click on column "1"
        Then I should see a "yellow" piece in the bottom of column "1"
        And I should see the info text "It's Alice's turn."

    Scenario: Player's turn does not change when the column is full
        When I fill in "Player 1" with "Alice"
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        And I click column "0" six times
        Then I should see the info text "It's Alice's turn."
        When I click column "0" one more time
        Then I should still see the info text "It's Alice's turn."
        When I click on column "1"
        Then I should see a "red" piece in the bottom of column "1"
        And I should see the info text "It's Bob's turn."

    Scenario: Alice (player 1) wins
        When I fill in "Player 1" with "Alice"
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        And I click on column "0"
        And I click on column "1"
        And I click on column "0"
        And I click on column "1"
        And I click on column "0"
        And I click on column "1"
        And I click on column "0"
        Then I should see the info text "Alice wins!"

    Scenario: We play again with the same player names
        When I fill in "Player 1" with "Alice"
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        And I click on column "0"
        And I click on column "1"
        And I click on column "0"
        And I click on column "1"
        And I click on column "0"
        And I click on column "1"
        And I click on column "0"
        Then I should see the info text "Alice wins!"
        When I click the "Same players" button
        Then I should see the info text "Let's begin. Alice goes first."

    Scenario Outline: Radio buttons change label text and placeholder text
        When I click on the "<radioClass>" radio button with "<radioName>"
        Then I should see the label text "<labelText>" and "<placeholderText>" for "<labelID>" and "inputLabel"


        Examples:
            | radioClass | radioName | placeholderText | labelText   | labelID      |
            | player     | radio1    | Player 1        | Player 1:   | labelPlayer1 |
            | easyBot    | radio1    | Easy Bot 1      | Easy Bot 1: | labelPlayer1 |
            | hardBot    | radio1    | Hard Bot 1      | Hard Bot 1: | labelPlayer1 |
            | player     | radio2    | Player 2        | Player 2:   | labelPlayer2 |
            | easyBot    | radio2    | Easy Bot 2      | Easy Bot 2: | labelPlayer2 |
            | hardBot    | radio2    | Hard Bot 2      | Hard Bot 2: | labelPlayer2 |
