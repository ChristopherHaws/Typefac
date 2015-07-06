module Test {
    class Testing {

    }

    var builder = new Typefac.ContainerBuilder();
    builder
        .registerType(Testing)
        .as("ITesting");
}