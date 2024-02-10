function przelicz() {
  let liczba1 = parseFloat(document.getElementById("liczba1").value);
  let liczba2 = parseFloat(document.getElementById("liczba2").value);
  let liczba3 = parseFloat(document.getElementById("liczba3").value);
  let liczba4 = parseFloat(document.getElementById("liczba4").value);
  
  let suma = liczba1 + liczba2 + liczba3 + liczba4;
  let srednia = (liczba1 + liczba2 + liczba3 + liczba4) / 4;
  let max = Math.max(liczba1, liczba2, liczba3, liczba4);
  let min = Math.min(liczba1, liczba2, liczba3, liczba4);
  
  document.getElementById("wynik").innerHTML = "Suma: " + suma + " Średnia: " + srednia + " Max: " + max + " Min: " + min;
}
