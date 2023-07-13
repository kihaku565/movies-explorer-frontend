children = int(input())
candies = int(input())
each = candies // children
residue = candies - (each * children)
print(f"{each}\n{residue}")