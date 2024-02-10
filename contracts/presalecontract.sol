// SPDX-License-Identifier: MIT
/**
 * @custom:dev-run-script NatSpec tag.
 */

pragma solidity ^0.8.0;

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
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
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
    // address of Owner.
    address public ownerAddress;

    // DOMINO Token.
    IERC20 public dominoToken;

    // USDT Token.
    IERC20 public usdtToken;

    // the price of ETH. 10,000 = 1 ETH  = 10,000 DOMINO.
    uint256 public ethPrice;

    // the price of USDT. 5 = 1 USDT = 5 DOMINO
    uint256 public usdtPrice;

    // This is the limit amount for presale.
    uint256 public soldLimit;

    // total amount that sold.
    uint256 public totalSold;

    event Sell(address sender, uint256 totalvalue);

    // constructor
    constructor(
        address _tokenAddress,
        address _usdtAddress,
        uint256 _ethPrice,
        uint256 _usdtPrice,
        uint256 _soldLimit
    ) {
        ethPrice = _ethPrice;
        usdtPrice = _usdtPrice;
        dominoToken = IERC20(_tokenAddress);
        usdtToken = IERC20(_usdtAddress);
        ownerAddress = msg.sender;
        soldLimit = _soldLimit * (10 ** 18);
    }

    function buyWithUSDT(uint256 _amount) public payable {
        address buyer = msg.sender;

        require(totalSold < soldLimit, "Presale is finished.");
        // Check if buyer has enough amount of USDT.
        require(usdtToken.balanceOf(buyer) >= _amount, "Insufficient USDT.");

        uint256 dominoAmount = usdtPrice * _amount * (10 ** 18);
        require(
            totalSold + dominoAmount <= soldLimit,
            "That amount of domino token is not available."
        );
        require(
            dominoToken.balanceOf(ownerAddress) >= dominoAmount,
            "Insufficient DOMINO."
        );

        usdtToken.transferFrom(buyer, ownerAddress, _amount * (10 ** 6));
        dominoToken.transferFrom(ownerAddress, buyer, dominoAmount);

        totalSold += dominoAmount;
        emit Sell(buyer, dominoAmount);
    }

    // buyTokens function
    function buyTokens() public payable {
        address buyer = msg.sender;
        uint256 ethAmount = msg.value;
        // check if the contract has the tokens or not

        require(totalSold < soldLimit, "Presale is finished.");
        uint256 dominoAmount = ethPrice * ethAmount;

        require(
            totalSold + dominoAmount <= soldLimit,
            "That amount of domino token is not available."
        );

        require(
            dominoToken.balanceOf(ownerAddress) >= dominoAmount,
            "Insufficient DOMINO."
        );

        dominoToken.transferFrom(ownerAddress, buyer, dominoAmount);

        totalSold += dominoAmount;
        // emit sell event for ui
        emit Sell(buyer, dominoAmount);
    }

    // end sale
    function withdrawETH() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
