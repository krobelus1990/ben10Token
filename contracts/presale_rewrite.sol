// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        this; // silence state mutability warning without generating bytecode
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract TokenPreSale is Ownable {
    IERC20 public dominoToken;
    IERC20 public usdtToken;

    uint256 public tokenPrice;
    // uint256 public usdtPrice;
    // uint256 public soldLimit;
    uint256 public totalSold;
    uint256 public totalValueRaised;
    uint256 public hardcap;
    uint256 usdt_decimal;
    AggregatorV3Interface public priceFeed;

    event Sell(address sender, uint256 totalvalue);

    constructor(
        address _tokenAddress,
        address _usdtAddress,
        uint256 _tokenPrice,
        uint256 _hardcap,
        address _price_fetch_address
    ) {
        // ethPrice = _ethPrice;
        dominoToken = IERC20(_tokenAddress);
        usdtToken = IERC20(_usdtAddress);
        // soldLimit = _soldLimit * (10 ** 18);
        hardcap = _hardcap;
        tokenPrice = _tokenPrice;
        priceFeed = AggregatorV3Interface(_price_fetch_address);
        usdt_decimal = 6;
    }

    function buyWithUSDT(uint256 _amount) public {
        address buyer = msg.sender;
        // require(totalSold < soldLimit, "Presale is finished.");

        // uint256 amountInStandardUnits = _amount * (10 ** usdt_decimal);
        totalValueRaised += _amount;
        require(totalValueRaised <= hardcap, "Presale limit reached.");

        uint256 dominoAmount = _amount * tokenPrice;
        // require(
        //     totalSold + dominoAmount <= soldLimit,
        //     "Amount of domino token not available."
        // );
        require(
            dominoToken.balanceOf(address(this)) >= dominoAmount,
            "Insufficient DOMINO."
        );

        usdtToken.transferFrom(buyer, address(this), _amount);
        dominoToken.transfer(buyer, dominoAmount);
        totalSold += dominoAmount;
        emit Sell(buyer, dominoAmount);
    }

    function buyTokens() public payable {
        address buyer = msg.sender;
        require(msg.value > 10 ** (18 - usdt_decimal), "Insufficent funds");

        uint256 ethInUSDT = msg.value * uint256(getLatestPrice()) / 10 ** 20;
        totalValueRaised += ethInUSDT;
        require(totalValueRaised <= hardcap, "Presale limit reached.");

        uint256 dominoAmount = tokenPrice * msg.value * uint256(getLatestPrice()) / 10 ** 8;

        require(
            dominoToken.balanceOf(address(this)) >= dominoAmount,
            "Insufficient DOMINO."
        );

        dominoToken.transfer(buyer, dominoAmount);
        totalSold += dominoAmount;
        emit Sell(buyer, dominoAmount);
    }

    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }

    function withdrawETH() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function withdrawUSDT() external onlyOwner() {
        usdtToken.transfer(msg.sender, usdtToken.balanceOf(address(this)));
    }
}
