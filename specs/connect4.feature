
Feature: Play Connect 4

    Background: game page
        Given I am on the game page

    Scenario: Starting a new game
        Then I should see "Connect 4"

    Scenario: Starting the game with player names
        When I fill in "Player 1" with "Alice"
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        Then I should see "Let's begin. Alice goes first."

    # Scenario: Starting the game without entering a name
    #     When I click the "Play" button without entering a name
    #     Then I should see an error message 

    Scenario: Alice (player 1) plays a piece
        When I fill in "Player 1" with "Alice"
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        Then I should see "Let's begin. Alice goes first."
        When I click on column "0" 
        Then I should see a yellow piece in column "0"
        And I should see "It's Bob's turn."

    Scenario: Bob (player 2) plays a piece
        When I fill in "Player 1" with "Alice" 
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        Then I should see "Let's begin. Alice goes first."
        When I click on column "0"
        Then I should see a "yellow" piece in column "0"
        And I should see "It's Bob's turn."
        When I click on column "1"
        Then I should see a "red" piece in column "1"
        And I should see "It's Alice's turn."

    Scenario: Player's turn does not change when the column is full
        When I fill in "Player 1" with "Alice"
        And I fill in "Player 2" with "Bob"
        And I click the "Play" button
        And I click column "0" six times
        Then I should see "It's Alice's turn."
        When I click column "0" one more time
        Then I should still see "It's Alice's turn."
        When I click column "1"
        Then I should see a "yellow" piece in column "1"
        And I should see "It's Bob's turn."

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
        Then I should see "Alice wins!"
   
       

