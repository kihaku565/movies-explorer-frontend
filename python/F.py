name = input()
price = input()
weigh = input()
cash = input()
total = int(price) * int(weigh)
odd_money = int(cash) - total
print(f"Чек\n{name} - {weigh}кг - {price}руб/кг\nИтого: {total}руб\nВнесено: {cash}руб\nСдача: {odd_money}руб")