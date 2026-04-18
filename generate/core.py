# Core logic and abstractions for the generative system
from logic import LogicSet
from cs_principles import CSPrinciples
from innovations import Innovations

class GenerativeSystem:
    def __init__(self):
        self.logic = LogicSet()
        self.cs = CSPrinciples()
        self.innovations = Innovations()

    def run(self):
        print("[GenerativeSystem] Starting generation...")
        # Example: apply logic, cs principles, and innovations
        data = self.logic.generate_seed()
        data = self.cs.apply_principles(data)
        result = self.innovations.transform(data)
        with open("output/generated.txt", "w") as f:
            f.write(str(result))
        print("[GenerativeSystem] Generation complete. Output in output/generated.txt")
