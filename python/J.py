name = input()
number = int(input())
group = number // 100
number_name = number % 10
locker = number
bed = number // 10 % 10
print(f"Группа №{group}.\n{number_name}. {name}.\nШкафчик: {locker}.\nКроватка: {bed}.")