asciidoctor-web-pdf   --template-require ./jagedn/template.js -D pdfs  *.adoc

pdfunite pdfs/0-100-java-a-k8s-1.pdf pdfs/0-100-java-a-k8s-2.pdf pdfs/0-100-java-a-k8s.pdf