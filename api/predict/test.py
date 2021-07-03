import sys

print(str(len(sys.argv) != 2))

# Ler os dados que são passados como parâmetro
if len(sys.argv) == 2:
    raw_data = str(sys.argv[1])
else:
    print('{"error":"There are no data received"}')
