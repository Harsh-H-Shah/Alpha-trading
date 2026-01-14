from datetime import datetime
from typing import List, Dict, Optional

class GameState:
    def __init__(self):
        self.balance: float = 10000.00
        self.positions: Dict[str, Dict] = {} # { "AAPL": { "qty": 10, "avg_price": 150.00 } }
        self.history: List[Dict] = []

    def get_portfolio(self):
        return {
            "balance": self.balance,
            "positions": [
                {"symbol": k, **v} for k, v in self.positions.items()
            ],
            "history": self.history
        }

    def execute_trade(self, symbol: str, type: str, qty: int, price: float):
        total_cost = qty * price
        
        if type == "buy":
            if total_cost > self.balance:
                raise ValueError("Insufficient buying power")
            self.balance -= total_cost
            
            # Update position
            if symbol in self.positions:
                current = self.positions[symbol]
                new_qty = current['qty'] + qty
                # Weighted average price
                new_avg = ((current['qty'] * current['avg_price']) + total_cost) / new_qty
                self.positions[symbol] = {"qty": new_qty, "avg_price": new_avg}
            else:
                self.positions[symbol] = {"qty": qty, "avg_price": price}

        elif type == "sell":
            if symbol not in self.positions or self.positions[symbol]['qty'] < qty:
                raise ValueError("Insufficient shares to sell")
            
            self.balance += total_cost
            self.positions[symbol]['qty'] -= qty
            
            if self.positions[symbol]['qty'] == 0:
                del self.positions[symbol]

        # Record History
        self.history.insert(0, {
            "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "symbol": symbol,
            "type": type,
            "qty": qty,
            "price": price
        })
        
        return self.get_portfolio()

# Global Instance
game = GameState()
