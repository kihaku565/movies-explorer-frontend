number = int(input())
number_1 = number // 100 % 10
number_2 = number // 1000
number_3 = number % 10
number_4 = number // 10 % 10
print(f"{number_1}{number_2}{number_3}{number_4}")