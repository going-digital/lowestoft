SOURCE = tidetable.js
LIBS = $(shell ls src/lib/*.js src/components/*.js)
TARGET = docs/tidetable.js
FLAGS = #-t reactify -t es6ify

WATCHIFY = watchify
BROWSERIFY = browserify
NPM = npm

.PHONY: build clean watch

build: $(TARGET)

clean:
	rm -f $(TARGET)

watch:
	$(WATCHIFY) --verbose $(FLAGS) -o $(TARGET) -- $(SOURCE)

$(TARGET): $(SOURCE) $(LIBS) node_modules
	$(BROWSERIFY) $(FLAGS) -o $@ -- $<

node_modules:
	$(NPM) install
