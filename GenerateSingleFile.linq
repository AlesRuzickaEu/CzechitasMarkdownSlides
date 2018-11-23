<Query Kind="Program">
  <Reference>&lt;RuntimeDirectory&gt;\System.Web.dll</Reference>
</Query>

void Main()
{
	Directory.SetCurrentDirectory (Path.GetDirectoryName (Util.CurrentQueryPath));
	
	var finalFileName = "slides.dist.js";
	
	var jsFileName = "slides.js";
	var markedFileName = "marked.min.js";
	var cssFileName = "slides.css";
	
	// CSS embed images
	
	var cssFileContent = File.ReadAllText(cssFileName, Encoding.UTF8);
	var colorImgContent = GetEmbedableSVG(@"logoColor.svg");
	var whiteImgContent = GetEmbedableSVG(@"logoWhite.svg");

	cssFileContent=cssFileContent.Replace("'logoColor.svg'", $"'data:image/svg+xml;utf8,{colorImgContent}'");
	cssFileContent=cssFileContent.Replace("'logoWhite.svg'", $"'data:image/svg+xml;utf8,{whiteImgContent}'");
	
	// JS to single fiel
	var jsFileContent = File.ReadAllText(jsFileName, Encoding.UTF8);
	var markedFileContent = File.ReadAllText(markedFileName, Encoding.UTF8);

	var finalJsFileContent = $@"
{markedFileContent}

/**
 * Czechitas Markdown Slides
 * https://github.com/AlesRuzickaEu/CzechitasMarkdownSlides
 */
{jsFileContent}
	
var styleEl = document.createElement('style');
styleEl.innerHTML = `{cssFileContent}`;
document.head.appendChild(styleEl);
	
";
	
	File.WriteAllText(finalFileName, finalJsFileContent, Encoding.UTF8);	
}

string GetEmbedableSVG(string svgImageFile)
{
	var source = File.ReadAllText(svgImageFile, Encoding.UTF8);

	source = Regex.Replace(source, @">\s+<", "><");
	source = Regex.Replace(source, @"\s+", " ");
	source = source.Replace(@"<?xml version=""1.0"" encoding=""utf-8""?>", "");
	source = source.Replace(@"#", "%23");

	return source;
}