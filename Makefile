scattpy_bib_short_bib.html: scattpy_bib_short.bib
	bibtex2html -d -r -s siam scattpy_bib_short.bib
	sed -i '/<\/table>/,/<\/html>/ d' scattpy_bib_short.html
	sed -i '1,18 d' scattpy_bib_short.html
	echo '</table>' >> scattpy_bib_short.html
	mv scattpy_bib_short.html _includes/
