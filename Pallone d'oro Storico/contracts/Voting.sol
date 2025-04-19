// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;

contract Election {
    enum State {
        NotStarted,
        InProgress,
        Ended
    }

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    address public owner;
    State public electionState;

    struct Voter {
        uint256 id;
        string name;
    }

    mapping(uint256 => Candidate) candidates;
    mapping(address => bool) voted;

    mapping(address => bool) isVoter;

    uint256 public candidatesCount = 0;

    uint256 public votersCount = 0;

    constructor() {
        owner = msg.sender;
        electionState = State.NotStarted;
        addCandidate("Maradona");
        addCandidate("R9");
    }

    event Voted(uint256 indexed _candidateId);

    function startElection() public {
        require(msg.sender == owner);
        require(electionState == State.NotStarted);
        electionState = State.InProgress;
    }

    function endElection() public {
        require(msg.sender == owner);
        require(electionState == State.InProgress);
        electionState = State.Ended;
    }

    function addCandidate(string memory _name) public {
        require(owner == msg.sender, "SOLO L'AMMINISTRATORE PUO' AGGIUNGERE CANDIDATI");
        require(
            electionState == State.NotStarted,
            "ELEZIONI GIA' INZIATE"
        );

        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        candidatesCount++;
    }

    function addVoter(address _voter) public {
        require(owner == msg.sender, "Only owner can add voter");
        require(!isVoter[_voter], "VOTANTE GIA' AGGIUNTO");
        require(
            electionState == State.NotStarted,
            "IL VOTANTE NON PUO' ESSERE AGGIUNTO DOPO L'INIZIO DELLE ELEZIONI"
        );

        isVoter[_voter] = true;
    }

    function getRole(address _current) public view returns (uint256) {
        if (owner == _current) {
            return 1;
        } else if (isVoter[_current]) {
            return 2;
        } else {
            return 3;
        }
    }

    function vote(uint256 _candidateId) public {
        require(
            electionState == State.InProgress,
            "ELEZIONI NON INZIATE"
        );
        require(isVoter[msg.sender], "UTENTE NON AUTORIZZATO");
        require(!voted[msg.sender], "HAI GIA' VOTATO");
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "ID NON VALIDO"
        );

        candidates[_candidateId].voteCount++;
        voted[msg.sender] = true;

        emit Voted(_candidateId);
    }

    function getCandidateDetails(uint256 _candidateId)
        public
        view
        returns (string memory, uint256)
    {
        require(
            _candidateId >= 0 && _candidateId < candidatesCount,
            "ID NON VALIDO"
        );
        return (
            candidates[_candidateId].name,
            candidates[_candidateId].voteCount
        );
    }
}
