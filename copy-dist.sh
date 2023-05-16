# for all directories in games, copy the dist directory to the dist directory in the root of the project

mkdir -p dist

for d in games/* ; do
    # remove game/ from the path
    if [ -d "$d" ]; then
        d=${d#games/}
        echo "copying dist directory from $d to dist"
        
        mkdir -p "dist/$d"

        # copy only the contents of the dist directory
        cp -r "games/$d/dist/." "dist/$d"
    fi
done